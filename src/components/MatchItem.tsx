import React from "react";
import moment from "moment";
import { IonItem, IonGrid, IonRow, IonCol } from "@ionic/react";

interface ContainerProps {
  p1: String;
  p2: String;
  p1score: Number;
  p2score: Number;
  ts: string;
  remarks: String;
}

const MatchItem: React.FC<ContainerProps> = ({
  p1,
  p2,
  p1score,
  p2score,
  ts,
  remarks
}) => {
  return (
    <IonItem>
      <IonGrid>
        <IonRow>
          <h5>{remarks}</h5>
        </IonRow>
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
          <p style={{ fontSize: 12, opacity: 0.5 }}>{moment(ts).fromNow()}</p>
        </IonRow>
      </IonGrid>
    </IonItem>
  );
};

export default MatchItem;
