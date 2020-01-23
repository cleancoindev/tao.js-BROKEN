import { VAULT_ADDRESS, VAULT_TYPE } from './constants';
import { bytesToString } from '../utils';

export const cdpManagerUrns = {
  generate: id => ({
    id: `CDP_MANAGER.urns(${id})`,
    contractName: 'CDP_MANAGER',
    call: ['urns(uint256)(address)', parseInt(id)]
  }),
  returns: [VAULT_ADDRESS]
};

export const cdpManagerIlks = {
  generate: id => ({
    id: `CDP_MANAGER.ilks(${id})`,
    contractName: 'CDP_MANAGER',
    call: ['ilks(uint256)(bytes32)', parseInt(id)]
  }),
  returns: [[VAULT_TYPE, bytesToString]]
};

export default {
  cdpManagerUrns,
  cdpManagerIlks
};