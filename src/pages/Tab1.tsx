import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList
} from "@ionic/react";
import RankingItem from "../components/RankingItem";
import database from "../firebase";
import "./Tab1.css";

const Tab1: React.FC = () => {
  const [rankings, setRankings] = useState<String[]>([]);
  useEffect(() => {
    database
      .ref("rankings")
      .once("value")
      .then((snapshot: any) => {
        setRankings(snapshot.val());
      });
  }, [rankings]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Aquarius Squash Ladder</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {rankings.map((item, index) => (
            <RankingItem name={item} position={index + 1} key={index} />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
