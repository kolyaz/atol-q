const w = require('./bindings');
const fptr = new w.Fptr10();
console.log('w', w);
// console.log('version', fptr.version());
fptr.create();
const settings = fptr.getSettings();
// console.log('getSettings', settings);
// settings.Port = 0;  // ComPort communication
settings.Port = 2;  // TCP/ip communication
settings.IPAddress = '192.168.88.50';
// settings.IPPort = 5555;
settings.OfdChannel = 1;
// settings.ComFile = '/dev/ttyACM0'; //ComPort name
// settings.ComFile = 'COM5';  // ComPort name
// settings.BaudRate = 115200;
settings.Model = 63;
// fptr.setSingleSetting(fptr.LIBFPTR_SETTING_MODEL, toString(fptr.LIBFPTR_MODEL_ATOL_AUTO));
// fptr.setSingleSetting(fptr.LIBFPTR_SETTING_PORT, toString(fptr.LIBFPTR_PORT_COM));
// fptr.setSingleSetting(fptr.LIBFPTR_SETTING_COM_FILE, 'COM5');
// fptr.setSingleSetting(fptr.LIBFPTR_SETTING_BAUDRATE, toString(fptr.LIBFPTR_PORT_BR_115200));
// fptr.applySingleSettings();
console.log('settings', settings);

console.log('setSettings', fptr.setSettings(settings));
console.log('isOpened', fptr.isOpened());
console.log('open', fptr.open());

console.log('isOpened', fptr.isOpened());
console.log('getData', fptr.processJson({type: 'getDeviceStatus'}));
console.log('findLastDocument', fptr.findLastDocument());

// try {
//     console.log('fnReport', fptr.fnReport(1));
// } catch (e) {
//     console.log('error', e.message, 'code', e.code, 'descr', e.description);
// }
// console.log('openShift', fptr.processJson({
//     type: 'openShift',
//
//     operator: {
//        name: 'Иванов',
//        vatin: '123654789507'
//     },
//
//     postItems: [
//         {
//             type: 'text',
//             text: 'ОТКРЫТА НОВАЯ СМЕНА',
//             alignment: 'center',
//             doubleWidth: true
//         }
//     ]
// }));
// console.log('closeShift', fptr.processJson({
//     type: 'closeShift',
//     operator: {
//         name: 'Иванов',
//         vatin: '123654789507'
//     }
// }));

fptr.processJsonAsync(
    {type: 'reportX', operator: {name: 'Иванов', vatin: '123654789507'}},
    (err, result) => {
      if (err) {
        throw err;
      } else {
        console.log('reportX', result);
        fptr.processJsonAsync({type: 'getDeviceStatus'}, (err, result) => {
          if (err) {
            throw err;
          } else {
            console.log('getDeviceStatus', result);
            console.log('close', fptr.close());
          }
        })
      }
    });
