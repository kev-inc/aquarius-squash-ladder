import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonButton,
  IonToolbar,
  IonList,
  IonFab,
  IonFabButton,
  IonIcon,
  IonItemSliding,
  IonItemOptions,
  IonItemOption
} from "@ionic/react";
import database from "../firebase";
import MatchItem from "../components/MatchItem";
import { trash, add, swapHorizontal } from "ionicons/icons";

const AdminMatches: React.FC = () => {
  const [matches, setMatches] = useState<
    {
      id: String;
      match: {
        p1: String;
        p2: String;
        p1score: Number;
        p2score: Number;
        ts: string;
        remarks: String;
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
        } else {
          setMatches([]);
        }
      });
  }, [matches]);

  const deleteMatch = (id: String) => {
    database.ref("matches/" + id).remove();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButton
            fill="clear"
            routerLink="/admin/rankings"
            routerDirection="root"
          >
            Edit Matches
            <IonIcon icon={swapHorizontal} />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {matches
            .slice(0)
            .reverse()
            .map((item, index) => (
              <IonItemSliding key={index}>
                <MatchItem
                  p1={item.match.p1}
                  p2={item.match.p2}
                  p1score={item.match.p1score}
                  p2score={item.match.p2score}
                  ts={item.match.ts}
                  remarks={item.match.remarks}
                />
                <IonItemOptions>
                  <IonItemOption
                    color="danger"
                    onClick={() => deleteMatch(item.id)}
                  >
                    <IonIcon icon={trash}></IonIcon>
                  </IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
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

export default AdminMatches;
