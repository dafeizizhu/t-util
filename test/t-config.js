/* global describe, it */

const path = require('path')
const assert = require('assert')

const TConfig = require('../lib/t-config')

describe('TConfig', () => {
  it('test', () => {
    let tafConfig = TConfig.parseFile(path.join(__dirname, './Prod.Video.UploadStatusServer.config.conf'))

    assert.equal(tafConfig.data.taf.application.server.node, 'taf.tafnode.ServerObj@tcp -h 222.222.222.222 -p 17896 -t 60000')
    assert.equal(tafConfig.data.taf.application.server.app, 'Video')
    assert.equal(tafConfig.data.taf.application.server.server, 'UploadStatusServer')
    assert.equal(tafConfig.data.taf.application.server.localip, '222.222.222.222')
    assert.equal(tafConfig.data.taf.application.server.basepath, '/data/app/taf/tafnode/data/Video.UploadStatusServer/bin/')
    assert.equal(tafConfig.data.taf.application.server.datapath, '/data/app/taf/tafnode/data/Video.UploadStatusServer/data/')
    assert.equal(tafConfig.data.taf.application.server.logpath, '/data/app/taf/app_log//')
    assert.equal(tafConfig.data.taf.application.server.logsize, '50M')
    assert.equal(tafConfig.data.taf.application.server.lognum, '10')
    assert.equal(tafConfig.data.taf.application.server.netthread, '2')
    assert.equal(tafConfig.data.taf.application.server.local, 'tcp -h 127.0.0.1 -p 16008 -t 3000')
    assert.equal(tafConfig.data.taf.application.server.config, 'taf.tafconfig.ConfigObj')
    assert.equal(tafConfig.data.taf.application.server.notify, 'taf.tafnotify.NotifyObj')
    assert.equal(tafConfig.data.taf.application.server.log, 'taf.taflog.LogObj')
    assert.equal(tafConfig.data.taf.application.server['Video.UploadStatusServer.UploadStatusObjAdapter'].endpoint, 'tcp -h 222.222.222.222 -p 16008 -t 60000')
    assert.equal(tafConfig.data.taf.application.server['Video.UploadStatusServer.UploadStatusObjAdapter'].handlegroup, 'Video.UploadStatusServer.UploadStatusObjAdapter')
    assert.equal(tafConfig.data.taf.application.server['Video.UploadStatusServer.UploadStatusObjAdapter'].maxconns, '1024')
    assert.equal(tafConfig.data.taf.application.server['Video.UploadStatusServer.UploadStatusObjAdapter'].protocol, 'taf')
    assert.equal(tafConfig.data.taf.application.server['Video.UploadStatusServer.UploadStatusObjAdapter'].queuecap, '10000')
    assert.equal(tafConfig.data.taf.application.server['Video.UploadStatusServer.UploadStatusObjAdapter'].queuetimeout, '60000')
    assert.equal(tafConfig.data.taf.application.server['Video.UploadStatusServer.UploadStatusObjAdapter'].servant, 'Video.UploadStatusServer.UploadStatusObj')
    assert.equal(tafConfig.data.taf.application.server['Video.UploadStatusServer.UploadStatusObjAdapter'].shmcap, '0')
    assert.equal(tafConfig.data.taf.application.server['Video.UploadStatusServer.UploadStatusObjAdapter'].shmkey, '0')
    assert.equal(tafConfig.data.taf.application.server['Video.UploadStatusServer.UploadStatusObjAdapter'].threads, '1')
    assert.equal(tafConfig.data.taf.application.client.locator, 'taf.tafregistry.QueryObj@tcp -h 222.222.222.222 -p 17890')
    assert.equal(tafConfig.data.taf.application.client['sync-invoke-timeout'], '60000')
    assert.equal(tafConfig.data.taf.application.client['async-invoke-timeout'], '60000')
    assert.equal(tafConfig.data.taf.application.client['refresh-endpoint-interval'], '10000')
    assert.equal(tafConfig.data.taf.application.client.stat, 'taf.tafstat.StatObj')
    assert.equal(tafConfig.data.taf.application.client['report-interval'], '60')
    assert.equal(tafConfig.data.taf.application.client.sendthread, '1')
    assert.equal(tafConfig.data.taf.application.client.recvthread, '1')
    assert.equal(tafConfig.data.taf.application.client.asyncthread, '10')
    assert.equal(tafConfig.data.taf.application.client.modulename, 'Video.UploadStatusServer')
  })
})
