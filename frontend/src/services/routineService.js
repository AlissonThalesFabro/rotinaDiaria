/**
* Gerenciamento de operações relacionadas a rotinas:
 * - Busca rotina do dia
 * - Marca tarefas como completas
 * - Adiciona/remover atividades da rotina
 * - Consulta progresso e moedas
 */

import api from './Api';

/**
 * PRECISA CONFIRMAR ESTES ENDPOINTS NO BACKEND:
 * 
 * GET    /api/routines/child/:childId/today
 * POST   /api/routines/slots
 * PUT    /api/routines/slots/:id/complete
 * DELETE /api/routines/slots/:id
 * GET    /api/routines/child/:childId/progress
 * 
 */

const routineService = {
  /**
   * Busca a rotina do dia da criança
   * 
   * @param {number} childId - ID da criança
   * @param {string} date - Data no formato YYYY-MM-DD (opcional, padrão: hoje)
   * @returns {Promise<Object>} Rotina do dia com slots e atividades
   * 
   */
  async getTodayRoutine(childId, date = null) {
    try {
      const dateParam = date || new Date().toISOString().split('T')[0];
      const response = await api.get(`/routines/child/${childId}/today`, {
        params: { date: dateParam }
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar rotina do dia:', error);
      throw error;
    }
  },

  /**
   * Para adicionar atividade em um horário específico da rotina
   * 
   * @param {Object} slotData - Dados do slot
   * @param {number} slotData.childId - ID da criança
   * @param {string} slotData.time - Horário (formato HH:mm)
   * @param {number} slotData.activityId - ID da atividade
   * @param {string} slotData.date - Data (opcional, padrão: hoje)
   * @returns {Promise<Object>} Slot criado
   */
  async addActivityToRoutine(slotData) {
    try {
      const response = await api.post('/routines/slots', slotData);
      return response.data;
    } catch (error) {
      console.error('Erro ao adicionar atividade na rotina:', error);
      throw error;
    }
  },

  /**
   * Marca a atividade da rotina como completa/incompleta
   * 
   * @param {number} slotId - ID do slot
   * @param {boolean} completed - Status (true = completo, false = incompleto)
   * @returns {Promise<Object>} Slot atualizado com moedas ganhas
   * 
   * - Quando marca como completo: criança GANHA moedas
   * - Quando desmarca: criança PERDE moedas
   * 
   * Exemplo de resposta:
   * {
   *   slot: { id: 1, completed: true, ... },
   *   coinsEarned: 5,
   *   totalCoins: 50
   * }
   */
  async toggleSlotComplete(slotId, completed) {
    try {
      const response = await api.put(`/routines/slots/${slotId}/complete`, {
        completed
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao marcar slot como completo:', error);
      throw error;
    }
  },

  /**
   * Remove item da rotina
   @param {number} slotId - ID do slot a ser removido
   * @returns {Promise<void>}
   */
  async removeSlotFromRoutine(slotId) {
    try {
      await api.delete(`/routines/slots/${slotId}`);
    } catch (error) {
      console.error('Erro ao remover slot da rotina:', error);
      throw error;
    }
  },

  /**
   * Busca o progresso e estatísticas da criança
   * 
   * @param {number} childId - ID da criança
   * @returns {Promise<Object>} Progresso com moedas, streak, conquistas
   * 
   * Exemplo de resposta:
   * {
   *   totalCoins: 45,
   *   streak: 7,
   *   level: 1,
   *   tasksCompletedToday: 3,
   *   totalTasksToday: 7,
   *   achievements: [...]
   * }
   */
  async getProgress(childId) {
    try {
      const response = await api.get(`/routines/child/${childId}/progress`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar progresso:', error);
      throw error;
    }
  },

  /**
   * Busca histórico de rotinas (últimos 7 dias)
   * 
   * @param {number} childId - ID da criança
   * @param {number} days - Número de dias (padrão: 7)
   * @returns {Promise<Array>} Array de rotinas
   */
  async getRoutineHistory(childId, days = 7) {
    try {
      const response = await api.get(`/routines/child/${childId}/history`, {
        params: { days }
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar histórico:', error);
      throw error;
    }
  }
};

export default routineService;