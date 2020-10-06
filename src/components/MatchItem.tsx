import React from "react";
import { IonItem, IonText, IonGrid, IonRow, IonCol } from "@ionic/react";

interface ContainerProps {
  p1: string;
  p2: string;
  p1score: number;
  p2score: number;
  ts: string;
}

const MatchItem: React.FC<ContainerProps> = ({
  p1,
  p2,
  p1score,
  p2score,
  ts
}) => {
  return (
    <IonItem>
      <IonGrid>
        <IonRow>
          <IonCol class="ion-text-center">{p1}</IonCol>
          <IonCol class="ion-text-center">vs</IonCol>
          <IonCol class="ion-text-center">{p2}</IonCol>
        </IonRow>
        <IonRow>
          <IonCol class="ion-text-center">
            <span>{p1score}</span>
          </IonCol>
          <IonCol class="ion-text-center"></IonCol>
          <IonCol class="ion-text-center">
            <span>{p2score}</span>
          </IonCol>
        </IonRow>
        <IonRow>
          <p style={{ fontSize: 8, opacity: 0.5, textAlign: "center" }}>
            {new Date(ts).toString()}
          </p>
        </IonRow>
      </IonGrid>
    </IonItem>
  );
};

export default MatchItem;
