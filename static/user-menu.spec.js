'use strict';

const autoGlobals = require('auto-globals');
const stub = require('@cloudcmd/stub');
const tryToCatch = require('try-to-catch');
const wraptile = require('wraptile');
const defaultMenu = require('./user-menu');

const test = autoGlobals(require('supertape'));

const {create} = autoGlobals;
const {_data} = defaultMenu;

const reject = wraptile(async (a) => {
    throw Error(a);
});

test('cloudcmd: static: user menu: Rename', async (t) => {
    const name = 'F2 - Rename file';
    const DOM = getDOM();
    
    const {renameCurrent} = DOM;
    
    await defaultMenu[name]({
        DOM,
    });
    
    t.ok(renameCurrent.called, 'should call renameCurrent');
    t.end();
});

test('cloudcmd: static: user menu: R', (t) => {
    const name = 'R - cd /';
    const changeDir = stub();
    const CloudCmd = {
        changeDir,
    };
    
    const fn = defaultMenu[name];
    
    fn({
        CloudCmd,
    });
    
    t.calledWith(changeDir, ['/']);
    t.end();
});

test('cloudcmd: static: user menu: F6', async (t) => {
    const name = 'F6 - Copy URL to current file';
    const DOM = {};
    
    const fn = defaultMenu[name];
    const [error] = await tryToCatch(fn, {
        DOM,
    });
    
    t.equal(error.code, 'ERR_UNSUPPORTED_ESM_URL_SCHEME');
    t.end();
});

test('cloudcmd: static: user menu: Y', async (t) => {
    const name = 'Y - Convert YouTube to MP3';
    const DOM = {};
    
    const fn = defaultMenu[name];
    const [error] = await tryToCatch(fn, {
        DOM,
    });
    
    t.equal(error.code, 'ERR_UNSUPPORTED_ESM_URL_SCHEME');
    t.end();
});

test('cloudcmd: static: user menu: F', async (t) => {
    const name = 'F - Convert flac to mp3 [ffmpeg]';
    const DOM = {};
    
    const fn = defaultMenu[name];
    const [error] = await tryToCatch(fn, {
        DOM,
    });
    
    t.equal(error.code, 'ERR_UNSUPPORTED_ESM_URL_SCHEME');
    t.end();
});

test('cloudcmd: static: user menu: M', async (t) => {
    const name = 'M - Convert mp4 to mp3 [ffmpeg]';
    const DOM = {};
    
    const fn = defaultMenu[name];
    const [error] = await tryToCatch(fn, {
        DOM,
    });
    
    t.equal(error.code, 'ERR_UNSUPPORTED_ESM_URL_SCHEME');
    t.end();
});

test('cloudcmd: static: user menu: O', async (t) => {
    const name = 'O - Convert mov to mp3 [ffmpeg]';
    const DOM = {};
    
    const fn = defaultMenu[name];
    const [error] = await tryToCatch(fn, {
        DOM,
    });
    
    t.equal(error.code, 'ERR_UNSUPPORTED_ESM_URL_SCHEME');
    t.end();
});

test('cloudcmd: static: user menu: IO.write', async (t) => {
    const name = 'C - Create User Menu File';
    const DOM = getDOM();
    const CloudCmd = getCloudCmd();
    const {write} = DOM.IO;
    
    await defaultMenu[name]({
        DOM,
        CloudCmd,
    });
    
    const path = '/.cloudcmd.menu.js';
    
    t.calledWith(write, [path, _data], 'should call IO.write');
    t.end();
});

test('cloudcmd: static: user menu: C: exists: ok', async (t) => {
    const name = 'C - Create User Menu File';
    const DOM = getDOM();
    const CloudCmd = getCloudCmd();
    
    const {
        Dialog,
        getCurrentByName,
    } = DOM;
    
    const {confirm} = Dialog;
    const {write} = DOM.IO;
    
    getCurrentByName.returns({});
    confirm.resolves([]);
    
    await defaultMenu[name]({
        DOM,
        CloudCmd,
    });
    
    const path = '/.cloudcmd.menu.js';
    
    t.calledWith(write, [path, _data], 'should call IO.write');
    t.end();
});

test('cloudcmd: static: user menu: C: exists: cancel', async (t) => {
    const name = 'C - Create User Menu File';
    const DOM = getDOM();
    const CloudCmd = getCloudCmd();
    
    const {
        Dialog,
        getCurrentByName,
    } = DOM;
    
    const {confirm} = Dialog;
    const {write} = DOM.IO;
    
    getCurrentByName.returns({});
    confirm.resolves([Error('cancel')]);
    
    await defaultMenu[name]({
        DOM,
        CloudCmd,
    });
    
    t.notCalled(write);
    t.end();
});

test('cloudcmd: static: user menu: refresh', async (t) => {
    const name = 'C - Create User Menu File';
    const DOM = getDOM();
    const CloudCmd = getCloudCmd();
    const {refresh} = CloudCmd;
    
    await defaultMenu[name]({
        DOM,
        CloudCmd,
    });
    
    t.calledWithNoArgs(refresh, 'should call CloudCmd.refresh');
    t.end();
});

test('cloudcmd: static: user menu: setCurrentByName', async (t) => {
    const name = 'C - Create User Menu File';
    const DOM = getDOM();
    const CloudCmd = getCloudCmd();
    const {setCurrentByName} = DOM;
    
    await defaultMenu[name]({
        DOM,
        CloudCmd,
    });
    
    const fileName = '.cloudcmd.menu.js';
    
    t.calledWith(setCurrentByName, [fileName], 'should call DOM.setCurrentByName');
    t.end();
});

test('cloudcmd: static: user menu: EditFile.show', async (t) => {
    const name = 'C - Create User Menu File';
    const DOM = getDOM();
    const CloudCmd = getCloudCmd();
    const {EditFile} = CloudCmd;
    
    await defaultMenu[name]({
        DOM,
        CloudCmd,
    });
    
    t.ok(EditFile.show.called, 'should call EditFile.show');
    t.end();
});

test('cloudcmd: static: user menu: no EditFile.show', async (t) => {
    const name = 'C - Create User Menu File';
    const DOM = getDOM();
    const CloudCmd = getCloudCmd();
    const {IO} = DOM;
    const {EditFile} = CloudCmd;
    
    IO.write = stub(reject('Error'));
    
    await tryToCatch(defaultMenu[name], {
        DOM,
        CloudCmd,
    });
    
    t.notCalled(EditFile.show, 'should not call EditFile.show');
    t.end();
});

test('cloudcmd: static: user menu: compare directories', async (t) => {
    const name = 'D - Compare directories';
    const DOM = getDOM();
    const CloudCmd = getCloudCmd();
    
    await defaultMenu[name]({
        DOM,
        CloudCmd,
    });
    
    const {files} = DOM.CurrentInfo.files;
    
    t.calledWith(DOM.getFilenames, [files], 'should call getFilenames');
    t.end();
});

test('cloudcmd: static: user menu: compare directories: select names', (t) => {
    const {_selectNames} = defaultMenu;
    const selectFile = stub();
    const file = {};
    const getCurrentByName = stub().returns(file);
    
    const names = ['hi'];
    const panel = {};
    
    _selectNames(names, panel, {
        selectFile,
        getCurrentByName,
    });
    
    t.calledWith(selectFile, [file], 'should call selectFile');
    t.end();
});

test('cloudcmd: static: user menu: compare directories: select names: getCurrentByName', (t) => {
    const {_selectNames} = defaultMenu;
    const selectFile = stub();
    const getCurrentByName = stub();
    
    const name = 'hi';
    const names = [name];
    const panel = {};
    
    _selectNames(names, panel, {
        selectFile,
        getCurrentByName,
    });
    
    t.calledWith(getCurrentByName, [name, panel], 'should call selectFile');
    t.end();
});

test('cloudcmd: static: user menu: compare directories: select names: compare', (t) => {
    const {_compare} = defaultMenu;
    const a = [1, 2];
    const b = [1, 3];
    
    const result = _compare(a, b);
    const expected = [2];
    
    t.deepEqual(result, expected);
    t.end();
});

function getDOM() {
    const IO = {
        write: stub(),
    };
    
    const Dialog = {
        confirm: stub(),
    };
    
    const CurrentInfo = {
        dirPath: '/',
        files: [],
        filesPasive: [],
        panel: create(),
        panelPassive: create(),
    };
    
    return {
        IO,
        Dialog,
        CurrentInfo,
        setCurrentByName: stub(),
        getFilenames: stub().returns([]),
        getCurrentByName: stub(),
        renameCurrent: stub(),
    };
}

const getCloudCmd = () => ({
    refresh: stub(),
    EditFile: {
        show: stub(),
    },
});
