/*
    This file is part of web3.js.

    web3.js is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    web3.js is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
/**
 * @file index.js
 * @author Samuel Furter <samuel@ethereum.org>
 * @date 2018
 */

import {MethodController} from 'web3-core-method';
import {formatters} from 'web3-core-helpers';
import {Network} from 'web3-net';
import {ProvidersModuleFactory, providers} from 'web3-providers';
import Utils from 'web3-utils';
import {Accounts} from 'web3-eth-accounts';
import {Personal} from 'web3-eth-personal';
import {Ens} from 'web3-eth-ens';
import {SubscriptionsFactory} from 'web3-core-subscriptions';
import {AbiCoder} from 'web3-eth-abi';
import {Iban} from 'web3-eth-iban';
import {ContractModuleFactory} from 'web3-eth-contract';
import {PromiEvent} from 'web3-core-promievent';
import EthModuleFactory from './factories/EthModuleFactory';

/**
 * Creates the Eth object
 *
 * @method Eth
 *
 * @param {AbstractProviderAdapter|EthereumProvider} provider
 *
 * @returns {Eth}
 */
export const Eth = (provider) => {
    return new EthModuleFactory(
        provider,
        new ProvidersModuleFactory(),
        providers,
        new MethodController(),
        new Accounts(provider),
        PromiEvent,
        Utils,
        formatters,
        new ContractModuleFactory(),
        new AbiCoder()
    ).createEthModule(
        new Network(provider),
        new Personal(provider),
        Iban,
        new Ens(provider),
        new SubscriptionsFactory()
    );
};
