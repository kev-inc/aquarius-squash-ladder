import React, { useState } from "react";
import { IonItem, IonLabel, IonAvatar, IonChip, IonModal } from "@ionic/react";
import Tab2 from "../pages/Tab2";

interface ContainerProps {
  name: String;
  position: Number;
}

const RankingItem: React.FC<ContainerProps> = ({ name, position }) => {
  return (
    <IonItem routerLink={`/matches/${name}`} routerDirection="forward">
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
