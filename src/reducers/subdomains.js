// @flow

import * as types from '../constant/dictActions';

const initialState = {};

export default function update(state = initialState, action) {
  switch (action.type) {
    case types.APP_INIT: {
      if (action.payload.subdomains) {
        return { ...action.payload.subdomains };
      }
      return state;
    }
    case types.SUBDOMAIN_ADD: {
      return {
        ...state,
        [action.payload.values.name]: {
          name: action.payload.values.name,
          shortName: action.payload.values.shortName,
          value: action.payload.values.value,
          entities: [],
          services: [],
          relatedEntities: {},
          serviceDependencies: [],
        }
      };
    }
    case types.SUBDOMAIN_UPDATE: {
      const tempState = { ...state };
      const value = tempState[action.payload.record.name];
      value.name = action.payload.values.name;
      value.shortName = action.payload.values.shortName;
      value.value = action.payload.values.value;
      delete tempState[action.payload.record.name];
      return {
        ...tempState,
        [action.payload.values.name]: value,
      };
    }
    case types.SUBDOMAIN_DELETE: {
      const tempState = { ...state };
      delete tempState[action.payload.subdomainName];
      return { ...tempState };
    }
    case types.ENTITY_CREATE: {
      const subdomain = action.payload.subdomain;
      let entities = [];
      if (state[subdomain].entities) {
        entities = [...state[subdomain].entities, action.payload.name];
      } else {
        entities = [...[], action.payload.name];
      }
      const relatedEntities = {
        ...state[subdomain].relatedEntities,
        [subdomain + '_' + action.payload.name]: []
      };
      return {
        ...state,
        [subdomain]: {
          ...state[subdomain],
          entities,
          relatedEntities
        }
      };
    }
    case types.ENTITY_UPDATE: {
      let finalState;
      const oldSubdomain = [action.payload.oldSubdomain];
      const newSubdomain = [action.payload.newSubdomain];
      switch (action.payload.flag) {
        case types.ENTITY_ENTITYSUBDOMAIN_UPDATE:
          if (oldSubdomain[0] === newSubdomain[0]) {
            finalState = {
              ...state,
              [oldSubdomain]: {
                ...state[oldSubdomain],
                entities: action.payload.entitiesOld,
                relatedEntities: action.payload.relatedEntityOldKey,
              }
            };
          } else {
            finalState = {
              ...state,
              [oldSubdomain]: {
                ...state[oldSubdomain],
                entities: action.payload.entitiesOld,
                relatedEntities: action.payload.relatedEntityOldKey,
              },
              [newSubdomain]: {
                ...state[newSubdomain],
                entities: action.payload.entitiesNew,
                relatedEntities: action.payload.relatedEntityUpdateKey,
              },
            };
          }
          break;
        case types.ENTITY_RELATEDENTITY_UPDATE:
          finalState = {
            ...state,
            [action.payload.subdomain]: {
              ...state[action.payload.subdomain],
              relatedEntities: {
                ...state[action.payload.subdomain + '.relatedEntities'],
                [action.payload.relatedEntityKey]: action.payload.relatedEntityValue
              }
            }
          };
          break;
        case types.ENTITY_RELATEDSERVICE_UPDATE:
          break;
        default:
      }
      return finalState;
    }
    case types.SERVICE_ADD: {
      return { ...state,
        [action.payload.subdomain]: {
          ...state[action.payload.subdomain],
          services: [...(state[action.payload.subdomain].services || []), action.payload.service] }
      };
    }
    case types.SERVICE_UPDATE: {
      const services = state[action.payload.subdomain].services.concat();
      services[action.payload.index] = {
        ...services[action.payload.index],
        [action.payload.type]:
        action.payload.value
      };
      return { ...state,
        [action.payload.subdomain]: {
          ...state[action.payload.subdomain],
          services
        }
      };
    }
    case types.SERVICE_DELETE: {
      const services = state[action.payload.subdomain].services.concat();
      services.splice(action.payload.index, 1);
      return { ...state,
        [action.payload.subdomain]: {
          ...state[action.payload.subdomain],
          services
        }
      };
    }
    case types.SERVICE_FILES_UPDATE: {
      const services = state[action.payload.subdomain].services.concat();
      return { ...state,
        [action.payload.subdomain]: {
          ...state[action.payload.subdomain],
          services: services.map(service => {
            if (service.serviceName === action.payload.service) {
              return {
                ...service,
                files: action.payload.type === 'DELETE' ?
                  service.files.filter(file => file !== action.payload.file) :
                  service.files.concat(action.payload.file)
              };
            }
            return service;
          })
        }
      };
    }
    case types.ENTITY_RELATED_UPDATE: {
      return {
        ...state,
        [action.payload.subdomainName]: {
          ...state[action.payload.subdomainName],
          relatedEntities: {
            ...state[action.payload.subdomainName].relatedEntities,
            [action.payload.subdomainName + '_' + action.payload.entityName]: action.payload.relatedEntities
          }
        }
      };
    }
    case types.SERVICE_DEPENDENCIES_UPDATE: {
      return {
        ...action.payload,
      };
    }
    default:
      return state;
  }
}
