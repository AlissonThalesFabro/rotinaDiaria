import api from './Api';

/**
 * CONFIRMAR ENDPOINTS  BACKEND:
 * 
 * GET    /api/activities
 * GET    /api/activities/:id
 * POST   /api/activities
 * PUT    /api/activities/:id
 * DELETE /api/activities/:id
 */

const activityService = {
  /**
   * Para verificar as atividades disponíveis
   * 
   * @returns {Promise<Array>} Array de atividades
      */
  async getAllActivities() {
    try {
      const response = await api.get('/activities');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar atividades:', error);
      throw error;
    }
  },

  /**
   * Busca uma atividade específica por ID
   * 
   * @param {number} activityId - ID da atividade
   * @returns {Promise<Object>} Dados da atividade
   */
  async getActivityById(activityId) {
    try {
      const response = await api.get(`/activities/${activityId}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar atividade:', error);
      throw error;
    }
  },

  /**
   * Cria uma nova atividade
   * 
   * @param {Object} activityData - Dados da atividade
   * @param {string} activityData.name - Nome da atividade
   * @param {string} activityData.icon - Emoji/ícone (ex: "🦷")
   * @param {string} activityData.color - Cor em hexadecimal (ex: "#3B82F6")
   * @param {number} activityData.coins - Moedas que a atividade vale
   * @param {string} activityData.description - Descrição (opcional)
   * @param {string} activityData.category - Categoria (opcional)
   * @returns {Promise<Object>} Atividade criada
   * 
   * Exemplo de uso:
   * await createActivity({
   *   name: "Tomar Banho",
   *   icon: "🚿",
   *   color: "#06B6D4",
   *   coins: 10,
   *   description: "Tomar banho completo",
   *   category: "Higiene"
   * });
   */
  async createActivity(activityData) {
    try {
      const response = await api.post('/activities', activityData);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar atividade:', error);
      throw error;
    }
  },

  /**
   * Atualiza uma atividade existente
   * 
   * @param {number} activityId - ID da atividade
   * @param {Object} activityData - Dados a serem atualizados
   * @returns {Promise<Object>} Atividade atualizada
   * 
   * Exemplo de uso:
   * await updateActivity(1, {
   *   coins: 15  // Aumenta o valor das moedas
   * });
   */
  async updateActivity(activityId, activityData) {
    try {
      const response = await api.put(`/activities/${activityId}`, activityData);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar atividade:', error);
      throw error;
    }
  },

  /**
   * Remove uma atividade
   * 
   * @param {number} activityId - ID da atividade a ser removida
   * @returns {Promise<void>}
   */
  async deleteActivity(activityId) {
    try {
      await api.delete(`/activities/${activityId}`);
    } catch (error) {
      console.error('Erro ao deletar atividade:', error);
      throw error;
    }
  },

  /**
   * Busca atividades por categoria
   * 
   * @param {string} category - Categoria (Higiene, Alimentação, Educação, etc)
   * @returns {Promise<Array>} Array de atividades da categoria
   */
  async getActivitiesByCategory(category) {
    try {
      const response = await api.get('/activities', {
        params: { category }
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar atividades por categoria:', error);
      throw error;
    }
  },

  /**
   * Busca atividades mais usadas
   * 
   * @param {number} limit - Limite de resultados (padrão: 10)
   * @returns {Promise<Array>} Array de atividades mais populares
   */
  async getMostUsedActivities(limit = 10) {
    try {
      const response = await api.get('/activities/most-used', {
        params: { limit }
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar atividades mais usadas:', error);
      throw error;
    }
  }
};

export default activityService;