// Utilidades para manejo de fechas
const DateUtils = {
  getCurrentDate: function() {
      return new Date().toISOString().split('T')[0];
  },
  
  formatDate: function(date) {
      return new Date(date).toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
      });
  },
  
  getDaysDifference: function(date1, date2) {
      const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
      const diffDays = Math.round(Math.abs((date1 - date2) / oneDay));
      return diffDays;
  }
};

// Utilidades para manejo de montos
const MoneyUtils = {
  formatCurrency: function(amount, currency = 'CLP') {
      return new Intl.NumberFormat('es-CL', {
          style: 'currency',
          currency: currency
      }).format(amount);
  },
  
  roundToTwoDecimals: function(amount) {
      return Math.round(amount * 100) / 100;
  },
  
  calculatePercentage: function(part, total) {
      if (total === 0) return 0;
      return (part / total) * 100;
  }
};

// Utilidades para almacenamiento local
const StorageUtils = {
  saveToLocalStorage: function(key, data) {
      try {
          localStorage.setItem(key, JSON.stringify(data));
      } catch (error) {
          console.error('Error saving to localStorage:', error);
      }
  },
  
  getFromLocalStorage: function(key) {
      try {
          const data = localStorage.getItem(key);
          return data ? JSON.parse(data) : null;
      } catch (error) {
          console.error('Error retrieving from localStorage:', error);
          return null;
      }
  },
  
  removeFromLocalStorage: function(key) {
      try {
          localStorage.removeItem(key);
      } catch (error) {
          console.error('Error removing from localStorage:', error);
      }
  }
};

// Utilidades para generación de ID
const IDUtils = {
  generateUniqueId: function() {
      return Date.now().toString(36) + Math.random().toString(36).substr(2);
  },
  
  generateNumericId: function() {
      return Math.floor(Math.random() * 1000000);
  }
};