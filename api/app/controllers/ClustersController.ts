import type {HttpContext} from '@adonisjs/core/http'
import fs from 'fs';

export default class ClustersController {

  public async getAllClustersData({response }: HttpContext) {
    try {
      const timeSeriesData = JSON.parse(fs.readFileSync('clusters.json', 'utf-8'));
      response.status(200).json(timeSeriesData);
    } catch (error) {
      console.error('Error fetching time series data:', error);
      response.status(500).send('Failed to retrieve time series data');
    }
  }

  public async getClusterDataById({ params , response }: HttpContext) {
    try {
      const timeSeriesData = JSON.parse(fs.readFileSync('clusters.json', 'utf-8'));
      const cluster = timeSeriesData.clusters.find((c: { id: string }) => c.id === params.id);
      if (!cluster) {
        return response.status(404).send('Cluster not found');
      }
      const totalIOPS = cluster.metrics.iops.reduce((acc: { readTotal: any; writeTotal: any; }, entry: { read: any; write: any; }) => {
        acc.readTotal += entry.read;
        acc.writeTotal += entry.write;
        return acc;
      }, { readTotal: 0, writeTotal: 0 });

      const totalThroughput = cluster.metrics.throughput.reduce((acc: { readTotal: any; writeTotal: any; }, entry: { read: any; write: any; }) => {
        acc.readTotal += entry.read;
        acc.writeTotal += entry.write;
        return acc;
      }, { readTotal: 0, writeTotal: 0 });
      response.status(200).json({
        cluster: cluster,
        totalIOPS: totalIOPS,
        totalThroughput: totalThroughput,
      });
    } catch (error) {
      console.error('Error fetching cluster data:', error);
      response.status(500).send('Failed to retrieve cluster data');
    }
  }


  public async getSnapshotPolicy({ params,  response }: HttpContext) {
    try {
      const timeSeriesData = JSON.parse(fs.readFileSync('clusters.json', 'utf-8'));
      const cluster = timeSeriesData.clusters.find((c: { id: string }) => c.id === params.id);
      if (!cluster) {
        return response.status(404).send('Cluster not found');
      }
      response.status(200).json(cluster.snapshotPolicy);
    } catch (error) {
      console.error('Error fetching snapshot policy:', error);
      response.status(500).send('Failed to retrieve snapshot policy');
    }
  }


  public async updateSnapshotPolicy({ params, request, response }: HttpContext) {
    try {
      const timeSeriesData = JSON.parse(fs.readFileSync('clusters.json', 'utf-8'));
      const cluster = timeSeriesData.clusters.find((c: { id: string }) => c.id === params.id);
      const clusterIndex = timeSeriesData.clusters.findIndex((c: { id: string }) => c.id === params.id);
      if (!cluster) {
        return response.status(404).send('Cluster not found');
      }

      const newPolicy = request.body();
      timeSeriesData.clusters[clusterIndex] = {...cluster, snapshotPolicy: newPolicy};

      fs.writeFileSync('clusters.json', JSON.stringify(timeSeriesData, null, 2));

      response.status(200).json({ message: 'Snapshot policy updated successfully' });
    } catch (error) {
      console.error('Error updating snapshot policy:', error);
      response.status(500).send('Failed to update snapshot policy');
    }
  }
}
