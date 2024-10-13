/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const ClustersController = () => import('#controllers/ClustersController')


router.get('/clusters/:id/metrics', [ClustersController, 'getClusterDataById'])
router.get('/clusters/metrics', [ClustersController, 'getAllClustersData'])
router.get('/clusters/:id/snapshot-policy', [ClustersController, 'getSnapshotPolicy'])
router.put('/clusters/:id/snapshot-policy', [ClustersController, 'updateSnapshotPolicy'])
