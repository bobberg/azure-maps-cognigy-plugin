import * as React from "react";
import {
  AzureMap,
  AzureMapsProvider,
  IAzureMapOptions,
} from "react-azure-maps";
import { AuthenticationType } from "azure-maps-control";
import { style } from "./style.js";


const Marker = ({ text }) => <div style={style}>{text}</div>;

const AzureMapsMessage = (props) => {
  const { message } = props;
  const { data, text } = message;
  const { _plugin } = data;
  const { center, zoom, apikey } = _plugin;
  const { lat, lng } = center;

  const option = {
    authOptions: {
      authType: AuthenticationType.subscriptionKey,
      subscriptionKey: apikey, // Your subscription key
    },
  };

  return (
    <div style={{ height: "200px", width: "200px" }}>
      <AzureMapsProvider>
        <div style={{ height: "300px" }}>
          <AzureMap options={option} />
        </div>
        <Marker lat={lat} lng={lng} text={text} />
      </AzureMapsProvider>
    </div>
  );
};

const azureMapsPlugin = {
  match: "azure-maps",
  component: AzureMapsMessage,
  options: {
    fullwidth: true,
  },
};

if (!window.cognigyWebchatMessagePlugins) {
  window.cognigyWebchatMessagePlugins = [];
}

window.cognigyWebchatMessagePlugins.push(azureMapsPlugin);
