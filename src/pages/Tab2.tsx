import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonFab,
  IonFabButton,
  IonIcon
} from "@ionic/react";
import { add } from "ionicons/icons";
import MatchItem from "../components/MatchItem";
import "./Tab2.css";
import database from "../firebase";

const Tab2: React.FC = () => {
  const [matches, setMatches] = useState<
    {
      id: String;
      match: {
        p1: String;
        p2: String;
        p1score: Number;
        p2score: Number;
        ts: string;
      };
    }[]
  >([]);
  useEffect(() => {
    database
      .ref("matches")
      .once("value")
      .then((snapshot: any) => {
        const resp = snapshot.val();
        if (resp) {
          const arr = Object.keys(resp).map((match) => {
            return { id: match, match: resp[match] };
          });
          setMatches(arr);
        }
      });
  }, [matches]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Matches</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {matches
            .slice(0)
            .reverse()
            .map((item, index) => (
              <MatchItem
                key={index}
                p1={item.match.p1}
                p2={item.match.p2}
                p1score={item.match.p1score}
                p2score={item.match.p2score}
                ts={item.match.ts}
              />
            ))}
        </IonList>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton routerLink="/newmatch" routerDirection="forward">
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
