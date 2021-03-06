import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonItemGroup,
  IonItemDivider,
  IonButton,
  IonLabel,
  IonSelect,
  IonSelectOption
} from "@ionic/react";
import { RouteComponentProps } from "react-router-dom";
import database from "../firebase";

const scores = [0, 1, 2, 3, 4, 5];

const CreateNewGroupPage: React.FC<RouteComponentProps> = ({ history }) => {
  const [p1, setp1] = useState("");
  const [p1score, setp1score] = useState(0);
  const [p2, setp2] = useState("");
  const [p2score, setp2score] = useState(0);
  const [players, setPlayers] = useState<String[]>([]);
  useEffect(() => {
    database
      .ref("rankings")
      .once("value")
      .then((snapshot: any) => {
        setPlayers(snapshot.val());
      });
  }, []);

  const createRoom = () => {
    console.log("update rankings");
    var rankings = players.slice(0);
    if (rankings.length === 0) {
      return;
    }
    const p1rank = rankings.findIndex((p) => p === p1);
    const p2rank = rankings.findIndex((p) => p === p2);
    var remarks = "";
    if (p1rank === -1 || p2rank === -1) {
      return;
    }
    if (p1rank < p2rank) {
      // if p1 is better than p2
      if (p1score < p2score) {
        // p2 wins p1, update
        rankings.splice(p2rank, 1);
        rankings.splice(p1rank, 0, p2);
        remarks = `${p2} moves to rank ${p1rank + 1}`;
      } else {
        // p1 wins p2, do nothing
        remarks = "No change in ranking";
      }
    } else {
      if (p1score > p2score) {
        rankings.splice(p1rank, 1);
        rankings.splice(p2rank, 0, p1);
        remarks = `${p1} moves to rank ${p2rank + 1}`;
      } else {
        // do nothing
        remarks = "No change in rankings";
      }
    }
    database.ref("rankings").set(rankings);
    const ts = Date.now();
    database.ref("matches").push({
      p1: p1,
      p2: p2,
      p1score: p1score,
      p2score: p2score,
      ts: ts,
      remarks: remarks
    });
    history.goBack();
  };

  const isDisabled = () => {
    if (p1 === "" || p2 === "") {
      return true;
    }
    if (p1 === p2) {
      return true;
    }
    if (p1score === 0 && p2score === 0) {
      return true;
    }
    return false;
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>New Match</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          <IonItemGroup>
            <IonItemDivider>
              <IonLabel>Player 1</IonLabel>
            </IonItemDivider>
            <IonItem>
              <IonLabel>Name</IonLabel>
              <IonSelect
                value={p1}
                placeholder="Player 1"
                onIonChange={(e) => setp1(e.detail.value)}
              >
                {players.map((item, index) => (
                  <IonSelectOption value={item} key={index}>
                    {item}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel>Games won</IonLabel>
              <IonSelect
                value={p1score}
                placeholder="Player 1 score"
                onIonChange={(e) => setp1score(e.detail.value)}
              >
                {scores.map((item, index) => (
                  <IonSelectOption value={item} key={index}>
                    {item}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
          </IonItemGroup>

          <IonItemGroup>
            <IonItemDivider>
              <IonLabel>Player 2</IonLabel>
            </IonItemDivider>

            <IonItem>
              <IonLabel>Name</IonLabel>
              <IonSelect
                value={p2}
                placeholder="Player 2"
                onIonChange={(e) => setp2(e.detail.value)}
              >
                {players.map((item, index) => (
                  <IonSelectOption value={item} key={index}>
                    {item}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel>Games won</IonLabel>
              <IonSelect
                value={p2score}
                placeholder="Player 2 score"
                onIonChange={(e) => setp2score(e.detail.value)}
              >
                {scores.map((item, index) => (
                  <IonSelectOption value={item} key={index}>
                    {item}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
          </IonItemGroup>
        </IonList>
        <IonButton
          color="success"
          expand="block"
          onClick={createRoom}
          disabled={isDisabled()}
        >
          Save Match
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default CreateNewGroupPage;
