/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

App.KerberosWizardStep3Controller = App.KerberosProgressPageController.extend({
  name: 'kerberosWizardStep3Controller',
  clusterDeployState: 'KERBEROS_DEPLOY',
  serviceName: 'KERBEROS',
  componentName: 'KERBEROS_CLIENT',

  commands: ['installKerberos', 'testKerberos'],

  installKerberos: function() {
    App.ajax.send({
      name: 'common.create_component',
      sender: this,
      data: {
        serviceName: this.serviceName,
        componentName: this.componentName
      },
      success: 'onKerberosCreate',
      error: 'onKerberosCreate'
    });
  },

  onKerberosCreate: function() {
    var hostNames = this.get('content.hosts');
    this.createComponent(this.componentName, hostNames, this.serviceName);
  },

  testKerberos: function() {
    App.ajax.send({
      'name': 'service.item.smoke',
      'sender': this,
      'success': 'startPolling',
      'error': 'onTaskError',
      'data': {
        'serviceName': this.serviceName,
        'displayName': App.format.role(this.serviceName),
        'actionName': this.serviceName + '_SERVICE_CHECK'
      }
    });
  }
});

