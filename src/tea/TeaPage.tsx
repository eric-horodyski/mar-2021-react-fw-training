import React, { useEffect, useState } from 'react';
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { Tea } from '../shared/models';
import { useHistory } from 'react-router';
import { useAuthentication } from '../core/auth';
import { useTea } from './useTea';

import './TeaPage.css';
import { logOutOutline } from 'ionicons/icons';
import { Link } from 'react-router-dom';

export const listToMatrix = (teas: Tea[]): Array<Array<Tea>> => {
  let teaMatrix: Array<Array<Tea>> = [];

  let row: Array<Tea> = [];
  teas.forEach(tea => {
    row.push(tea);
    if (row.length === 4) {
      teaMatrix.push(row);
      row = [];
    }
  });

  if (row.length) teaMatrix.push(row);

  return teaMatrix;
};

const TeaPage: React.FC = () => {
  const { logout } = useAuthentication();
  const history = useHistory();
  const { getTeas } = useTea();
  const [teas, setTeas] = useState<Tea[]>([]);

  useEffect(() => {
    const init = async () => {
      const teas = await getTeas();
      setTeas(teas);
    };
    init();
  }, [getTeas]);

  const handleLogout = async () => {
    await logout();
    history.replace('/login');
  };

  const showDetailsPage = (id: number) => {
    history.push(`/tabs/tea/details/${id}`);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tea</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => handleLogout()}>
              <IonIcon slot="icon-only" icon={logOutOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="main-content">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tea</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonGrid className="tea-grid">
          {listToMatrix(teas).map((row, idx) => (
            <IonRow
              key={idx}
              className="ion-justify-content-center ion-align-items-stretch"
            >
              {row.map(tea => (
                <IonCol size="12" sizeMd="6" sizeXl="3" key={tea.id}>
                  <IonCard button onClick={() => showDetailsPage(tea.id)}>
                    <IonImg src={tea.image} />
                    <IonCardHeader>
                      <IonCardTitle>{tea.name}</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>{tea.description}</IonCardContent>
                  </IonCard>
                </IonCol>
              ))}
            </IonRow>
          ))}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default TeaPage;
