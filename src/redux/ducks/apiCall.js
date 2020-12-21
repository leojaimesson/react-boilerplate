export const createRequestTypes = (moduleName, prefix) => ({
  REQUESTED: `${moduleName}/${prefix}_REQUESTED`,
  SUCCEEDED: `${moduleName}/${prefix}_SUCCEEDED`,
  FAILED: `${moduleName}/${prefix}_FAILED`,
  CANCELLED: `${moduleName}/${prefix}_CANCELLED`,
});

export const Constants = {
  DEFAULT_REQUEST_TIMEOUT_MS: 60000,
  MODULE_NAME: 'apiCall',
};

export const Types = {
  API_CALL_REQUESTED: `${Constants.MODULE_NAME}/API_CALL_REQUESTED`,
};

export const requestApiCall = ({
  callName,
  args = {},
  actions,
  timeoutMS,
}) => ({
  type: Types.API_CALL_REQUESTED,
  payload: {
    callName,
    args,
    actions,
    timeoutMS,
  },
});

export const announceApiCall = ({ type, args = {} }) => ({
  type,
  payload: { args },
});

export const failApiCall = ({ type, error = {}, args = {} }) => ({
  type,
  payload: { error, args },
});

export const successApiCall = ({ type, data, args = {} }) => ({
  type,
  payload: { data, args },
});
