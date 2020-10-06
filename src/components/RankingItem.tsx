import React from "react";
import { IonItem, IonLabel, IonAvatar, IonChip } from "@ionic/react";

interface ContainerProps {
  name: String;
  position: Number;
}

const RankingItem: React.FC<ContainerProps> = ({ name, position }) => {
  return (
    <IonItem>
      <IonAvatar slot="start">
        <IonChip>
          <IonLabel color="secondary">{position}</IonLabel>
        </IonChip>
      </IonAvatar>
      <IonLabel>
        <h2>{name}</h2>
      </IonLabel>
    </IonItem>
  );
};

export default RankingItem;
