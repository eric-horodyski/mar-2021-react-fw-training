import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Plugins } from '@capacitor/core';
import { IonApp, IonRouterOutlet, isPlatform } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import TeaPage from './tea/TeaPage';
import LoginPage from './login/LoginPage';
import TeaDetailsPage from './tea/detail/TeaDetailsPage';
import { ProtectedRoute } from './core/auth';
import Tabs from './Tabs';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './theme/global.css';

const App: React.FC = () => {
  useEffect(() => {
    const { SplashScreen } = Plugins;
    if (isPlatform('capacitor')) SplashScreen.hide();
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/login" component={LoginPage} exact={true} />
          <ProtectedRoute path="/tabs" component={Tabs} />
          <Route exact path="/" render={() => <Redirect to="/login" />} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
