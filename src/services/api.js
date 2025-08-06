// Configuração base da API
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Métodos para produtos
  async getProducts() {
    return this.request('/products');
  }

  async getProduct(id) {
    return this.request(`/products/${id}`);
  }

  async getProductBySlug(slug) {
    return this.request(`/products/slug/${slug}`);
  }

  async createProduct(productData) {
    return this.request('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  }

  async updateProduct(id, productData) {
    return this.request(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  }

  async deleteProduct(id) {
    return this.request(`/products/${id}`, {
      method: 'DELETE',
    });
  }

  async reorderProducts(productIds) {
    return this.request('/products/reorder', {
      method: 'POST',
      body: JSON.stringify({ product_ids: productIds }),
    });
  }

  async toggleProductVisibility(id, isVisible) {
    return this.request(`/products/${id}/visibility`, {
      method: 'PATCH',
      body: JSON.stringify({ is_visible: isVisible }),
    });
  }

  // Métodos para página home
  async getHomepage() {
    return this.request('/homepage');
  }

  async updateHomepage(homepageData) {
    return this.request('/homepage', {
      method: 'PUT',
      body: JSON.stringify(homepageData),
    });
  }
}

export default new ApiService();

