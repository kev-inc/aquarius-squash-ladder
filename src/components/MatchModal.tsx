import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonButtons,
  IonBackButton
} from "@ionic/react";
import MatchItem from "../components/MatchItem";
import { RouteComponentProps } from "react-router";
import database from "../firebase";

interface ContainerProps
  extends RouteComponentProps<{
    player: string;
  }> {}

const MatchModal: React.FC<ContainerProps> = ({ match }) => {
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
          const filteredArr = arr.filter(
            (item) =>
              item.match["p1"] === match.params.player ||
              item.match["p2"] === match.params.player
          );
          setMatches(filteredArr);
        }
      });
  }, [matches, match]);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>{match.params.player}'s Matches</IonTitle>
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
                remarks={item.match.remarks}
              />
            ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default MatchModal;
