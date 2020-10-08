import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonAvatar,
  IonChip,
  IonLabel,
  IonIcon,
  IonButton,
  IonButtons,
  IonSelect,
  IonSelectOption
} from "@ionic/react";
import {
  trash,
  arrowUp,
  arrowDown,
  save,
  add,
  swapHorizontal
} from "ionicons/icons";
import database from "../firebase";
import { RouteComponentProps } from "react-router";

const AdminRankings: React.FC<RouteComponentProps> = ({ history }) => {
  const [rankings, setRankings] = useState<String[]>([]);
  const [loaded, setLoaded] = useState<Boolean>(false);
  useEffect(() => {
    if (!loaded) {
      database
        .ref("rankings")
        .once("value")
        .then((snapshot: any) => {
          setRankings(snapshot.val());
          setLoaded(true);
        });
    }
  }, [rankings, loaded]);

  const saveLadder = () => {
    database.ref("rankings").set(rankings);
    alert("Ladder saved");
  };

  const addPerson = () => {
    var person = prompt("Please enter new player name");
    if (person === null || person === "") {
      //
    } else {
      setRankings([...rankings, person]);
    }
  };

  const deletePerson = (index: number) => {
    if (window.confirm("Are you sure you want to delete " + rankings[index])) {
      var newRankings = rankings.splice(0);
      newRankings.splice(index, 1);
      setRankings(newRankings);
    }
  };

  const shiftUp = (index: number) => {
    const player = rankings[index];
    var newRankings = rankings.splice(0);
    newRankings.splice(index, 1);
    newRankings.splice(index - 1, 0, player);
    setRankings(newRankings);
  };

  const shiftDown = (index: number) => {
    const player = rankings[index];
    var newRankings = rankings.splice(0);
    newRankings.splice(index, 1);
    newRankings.splice(index + 1, 0, player);
    setRankings(newRankings);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButton
            fill="clear"
            routerLink="/admin/matches"
            routerDirection="root"
          >
            Edit Ranking
            <IonIcon icon={swapHorizontal} />
          </IonButton>
          <IonButtons slot="primary">
            <IonButton fill="clear" color="primary" onClick={addPerson}>
              <IonIcon icon={add} />
            </IonButton>
            <IonButton fill="clear" color="primary" onClick={saveLadder}>
              <IonIcon icon={save} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {rankings.map((item, index) => (
            <IonItem key={index}>
              <IonAvatar slot="start">
                <IonChip>
                  <IonLabel color="secondary">{index + 1}</IonLabel>
                </IonChip>
              </IonAvatar>
              <IonLabel>
                <h2>{item}</h2>
              </IonLabel>
              <IonButton onClick={() => shiftUp(index)} disabled={index === 0}>
                <IonIcon icon={arrowUp} size="small" />
              </IonButton>
              <IonButton
                onClick={() => shiftDown(index)}
                disabled={index === rankings.length - 1}
              >
                <IonIcon icon={arrowDown} size="small" />
              </IonButton>
              <IonButton onClick={() => deletePerson(index)}>
                <IonIcon icon={trash} size="small" />
              </IonButton>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default AdminRankings;
