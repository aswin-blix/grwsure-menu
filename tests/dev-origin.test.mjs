import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const WebSocket = require('next/dist/compiled/ws');
const endpoint = process.env.HMR_TEST_URL || 'ws://127.0.0.1:3000/_next/hmr';
function handshake(origin) {
  return new Promise((resolve,reject) => {
    const ws=new WebSocket(endpoint,{origin,handshakeTimeout:5000});
    ws.once('open',()=>{ws.close();resolve(101)});
    ws.once('unexpected-response',(_req,res)=>{res.resume();ws.terminate();resolve(res.statusCode)});
    ws.once('error',reject);
  });
}
test('HMR accepts the configured LAN origin',async()=>{
  assert.equal(await handshake('http://192.168.31.64:3000'),101);
});
test('HMR still rejects an unrelated origin',async()=>{
  // Next writes a raw Unauthorized response when rejecting an upgrade socket.
  await assert.rejects(()=>handshake('http://untrusted.example'),error=>
    error.code === 'HPE_INVALID_CONSTANT' && error.rawPacket?.toString() === 'Unauthorized');
});
