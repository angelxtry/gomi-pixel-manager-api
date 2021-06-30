'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * PixelCode 테이블에 name 컬럼을 추가합니다.
     */
    await queryInterface.addColumn('PixelCodes', 'name', {
      type: Sequelize.STRING
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * PixelCode 테이블에 name 컬럼을 삭제합니다.
     */
    await queryInterface.removeColumn('PixelCodes', 'name');
  }
};
