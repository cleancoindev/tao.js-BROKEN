import PrivateService from '../core/PrivateService';
import SmartContractService from './SmartContractService';
import EthereumTokenService from './EthereumTokenService';
import contracts from '../../contracts/contracts';
import TransactionObject from './TransactionObject';
import Cdp from './Cdp';

export default class EthereumCdpService extends PrivateService {
  static buildTestService() {
    const service = new EthereumCdpService();
    const tokenService = EthereumTokenService.buildTestService();
    const smartContract = SmartContractService.buildTestService();

    service
      .manager()
      .inject('smartContract', smartContract)
      .inject('token', tokenService);

    return service;
  }

  /**
   * @param {string} name
   */
  constructor(name = 'cdp') {
    super(name, ['smartContract', 'token']);
  }

  openCdp() {
    return new Cdp(this).transactionObject();
  }

  lockEth(cdpId, eth) {
    const contract = this.get('smartContract'),
      tubContract = contract.getContractByName(contracts.TUB),
      ethersUtils = contract.get('web3').ethersUtils(),
      ethersProvider = contract.get('web3').ethersProvider();

    return this.convertEthToPeth(eth).then(conversionTxn => {
      return conversionTxn.onMined().then(() => {
        const hexCdpId = contract.numberToBytes32(cdpId);
        const parsedAmount = ethersUtils.parseEther(eth);
        // solidity code: function lock(bytes32 cup, uint wad) public note
        const lockTxn = new TransactionObject(
          tubContract.lock(hexCdpId, parsedAmount),
          ethersProvider
        );

        return lockTxn;
      });
    });
  }

  drawDai(cdpId, amount) {
    const contract = this.get('smartContract'),
      tubContract = contract.getContractByName(contracts.TUB),
      ethersUtils = contract.get('web3').ethersUtils(),
      ethersProvider = contract.get('web3').ethersProvider();

    const hexCdpId = contract.numberToBytes32(cdpId);
    const parsedAmount = ethersUtils.parseEther(amount);

    //cdp must have peth locked inside it
    return tubContract
      .draw(hexCdpId, parsedAmount)
      .then(transaction => ethersProvider.waitForTransaction(transaction.hash))
      .then(() => {
        // eslint-disable-next-line
        this.getCdpInfo(cdpId).then(result => console.log(result));
      });
  }

  shutCdp(cdpId) {
    const contract = this.get('smartContract'),
      tubContract = contract.getContractByName(contracts.TUB),
      hexCdpId = contract.numberToBytes32(cdpId);

    return tubContract.shut(hexCdpId);
  }

  getCdpInfo(cdpId) {
    const contract = this.get('smartContract'),
      tubContract = contract.getContractByName(contracts.TUB);

    const hexCdpId = contract.numberToBytes32(cdpId);
    return tubContract.cups(hexCdpId);
  }
}
