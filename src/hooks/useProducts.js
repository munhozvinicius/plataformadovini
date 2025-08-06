import { useState, useEffect, useCallback } from 'react';
import ApiService from '../services/api';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await ApiService.getProducts();
      if (response.success) {
        setProducts(response.products);
      } else {
        setError(response.error || 'Erro ao carregar produtos');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createProduct = useCallback(async (productData) => {
    try {
      const response = await ApiService.createProduct(productData);
      if (response.success) {
        setProducts(prev => [...prev, response.product]);
        return response.product;
      } else {
        throw new Error(response.error || 'Erro ao criar produto');
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const updateProduct = useCallback(async (id, productData) => {
    try {
      const response = await ApiService.updateProduct(id, productData);
      if (response.success) {
        setProducts(prev => 
          prev.map(product => 
            product.id === id ? response.product : product
          )
        );
        return response.product;
      } else {
        throw new Error(response.error || 'Erro ao atualizar produto');
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const deleteProduct = useCallback(async (id) => {
    try {
      const response = await ApiService.deleteProduct(id);
      if (response.success) {
        setProducts(prev => prev.filter(product => product.id !== id));
        return true;
      } else {
        throw new Error(response.error || 'Erro ao deletar produto');
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const reorderProducts = useCallback(async (productIds) => {
    try {
      const response = await ApiService.reorderProducts(productIds);
      if (response.success) {
        // Reordena os produtos localmente
        const reorderedProducts = productIds.map(id => 
          products.find(product => product.id === id)
        ).filter(Boolean);
        setProducts(reorderedProducts);
        return true;
      } else {
        throw new Error(response.error || 'Erro ao reordenar produtos');
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [products]);

  const toggleProductVisibility = useCallback(async (id, isVisible) => {
    try {
      const response = await ApiService.toggleProductVisibility(id, isVisible);
      if (response.success) {
        setProducts(prev => 
          prev.map(product => 
            product.id === id ? response.product : product
          )
        );
        return response.product;
      } else {
        throw new Error(response.error || 'Erro ao alterar visibilidade do produto');
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    reorderProducts,
    toggleProductVisibility,
  };
};

export const useProduct = (id) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProduct = useCallback(async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      setError(null);
      const response = await ApiService.getProduct(id);
      if (response.success) {
        setProduct(response.product);
      } else {
        setError(response.error || 'Erro ao carregar produto');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return {
    product,
    loading,
    error,
    refetch: fetchProduct,
  };
};

export const useProductBySlug = (slug) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProduct = useCallback(async () => {
    if (!slug) return;
    
    try {
      setLoading(true);
      setError(null);
      const response = await ApiService.getProductBySlug(slug);
      if (response.success) {
        setProduct(response.product);
      } else {
        setError(response.error || 'Erro ao carregar produto');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return {
    product,
    loading,
    error,
    refetch: fetchProduct,
  };
};

