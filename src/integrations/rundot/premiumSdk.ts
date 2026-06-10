import { RundotGameAPI } from './rundot';
import { runGatedSdkCall } from './accessGate';

export const rundotPremium = {
  getTextModels: () => {
    return runGatedSdkCall('textGen.getAvailableCompletionModels', () =>
      RundotGameAPI.textGen.getAvailableCompletionModels(),
    );
  },

  requestChatCompletion: (
    ...args: Parameters<typeof RundotGameAPI.textGen.requestChatCompletionAsync>
  ) => {
    return runGatedSdkCall('textGen.requestChatCompletionAsync', () =>
      RundotGameAPI.textGen.requestChatCompletionAsync(...args),
    );
  },

  generateImage: (...args: Parameters<typeof RundotGameAPI.imageGen.generate>) => {
    return runGatedSdkCall('imageGen.generate', () =>
      RundotGameAPI.imageGen.generate(...args),
    );
  },

  createUgc: (...args: Parameters<typeof RundotGameAPI.ugc.create>) => {
    return runGatedSdkCall('ugc.create', () => RundotGameAPI.ugc.create(...args));
  },

  updateUgc: (...args: Parameters<typeof RundotGameAPI.ugc.update>) => {
    return runGatedSdkCall('ugc.update', () => RundotGameAPI.ugc.update(...args));
  },

  deleteUgc: (...args: Parameters<typeof RundotGameAPI.ugc.delete>) => {
    return runGatedSdkCall('ugc.delete', () => RundotGameAPI.ugc.delete(...args));
  },

  likeUgc: (...args: Parameters<typeof RundotGameAPI.ugc.like>) => {
    return runGatedSdkCall('ugc.like', () => RundotGameAPI.ugc.like(...args));
  },

  unlikeUgc: (...args: Parameters<typeof RundotGameAPI.ugc.unlike>) => {
    return runGatedSdkCall('ugc.unlike', () => RundotGameAPI.ugc.unlike(...args));
  },

  recordUgcUse: (...args: Parameters<typeof RundotGameAPI.ugc.recordUse>) => {
    return runGatedSdkCall('ugc.recordUse', () =>
      RundotGameAPI.ugc.recordUse(...args),
    );
  },

  reportUgc: (...args: Parameters<typeof RundotGameAPI.ugc.report>) => {
    return runGatedSdkCall('ugc.report', () => RundotGameAPI.ugc.report(...args));
  },

  createRoom: (...args: Parameters<typeof RundotGameAPI.rooms.createRoomAsync>) => {
    return runGatedSdkCall('rooms.createRoomAsync', () =>
      RundotGameAPI.rooms.createRoomAsync(...args),
    );
  },

  joinOrCreateRoom: (
    ...args: Parameters<typeof RundotGameAPI.rooms.joinOrCreateRoomAsync>
  ) => {
    return runGatedSdkCall('rooms.joinOrCreateRoomAsync', () =>
      RundotGameAPI.rooms.joinOrCreateRoomAsync(...args),
    );
  },

  joinRoomByCode: (
    ...args: Parameters<typeof RundotGameAPI.rooms.joinRoomByCodeAsync>
  ) => {
    return runGatedSdkCall('rooms.joinRoomByCodeAsync', () =>
      RundotGameAPI.rooms.joinRoomByCodeAsync(...args),
    );
  },

  getUserRooms: () => {
    return runGatedSdkCall('rooms.getUserRoomsAsync', () =>
      RundotGameAPI.rooms.getUserRoomsAsync(),
    );
  },

  subscribeRoom: (...args: Parameters<typeof RundotGameAPI.rooms.subscribeAsync>) => {
    return runGatedSdkCall('rooms.subscribeAsync', () =>
      RundotGameAPI.rooms.subscribeAsync(...args),
    );
  },

  updateRoomData: (
    ...args: Parameters<typeof RundotGameAPI.rooms.updateRoomDataAsync>
  ) => {
    return runGatedSdkCall('rooms.updateRoomDataAsync', () =>
      RundotGameAPI.rooms.updateRoomDataAsync(...args),
    );
  },

  getRoomData: (...args: Parameters<typeof RundotGameAPI.rooms.getRoomDataAsync>) => {
    return runGatedSdkCall('rooms.getRoomDataAsync', () =>
      RundotGameAPI.rooms.getRoomDataAsync(...args),
    );
  },

  sendRoomMessage: (
    ...args: Parameters<typeof RundotGameAPI.rooms.sendRoomMessageAsync>
  ) => {
    return runGatedSdkCall('rooms.sendRoomMessageAsync', () =>
      RundotGameAPI.rooms.sendRoomMessageAsync(...args),
    );
  },

  leaveRoom: (...args: Parameters<typeof RundotGameAPI.rooms.leaveRoomAsync>) => {
    return runGatedSdkCall('rooms.leaveRoomAsync', () =>
      RundotGameAPI.rooms.leaveRoomAsync(...args),
    );
  },

  kickPlayer: (...args: Parameters<typeof RundotGameAPI.rooms.kickPlayerAsync>) => {
    return runGatedSdkCall('rooms.kickPlayerAsync', () =>
      RundotGameAPI.rooms.kickPlayerAsync(...args),
    );
  },

  startRoomGame: (
    ...args: Parameters<typeof RundotGameAPI.rooms.startRoomGameAsync>
  ) => {
    return runGatedSdkCall('rooms.startRoomGameAsync', () =>
      RundotGameAPI.rooms.startRoomGameAsync(...args),
    );
  },

  proposeMove: (...args: Parameters<typeof RundotGameAPI.rooms.proposeMoveAsync>) => {
    return runGatedSdkCall('rooms.proposeMoveAsync', () =>
      RundotGameAPI.rooms.proposeMoveAsync(...args),
    );
  },

  validateMove: (
    ...args: Parameters<typeof RundotGameAPI.rooms.validateMoveAsync>
  ) => {
    return runGatedSdkCall('rooms.validateMoveAsync', () =>
      RundotGameAPI.rooms.validateMoveAsync(...args),
    );
  },
};