import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown, Eye, EyeOff, Trash2, GripVertical } from 'lucide-react';

export default function ProductOrderManager() {
  const [products, setProducts] = useState([]);
  const [hiddenProducts, setHiddenProducts] = useState({});

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    // Carregar produtos padrão
    const defaultProducts = [
      { id: 'vivo-sip', name: 'Vivo SIP', emoji: '📞', isDefault: true },
      { id: 'vivo-0800', name: 'Vivo 0800', emoji: '📞', isDefault: true },
      { id: 'vivo-voz-negocios', name: 'Vivo Voz Negócios', emoji: '🎤', isDefault: true },
      { id: 'vivo-internet-fibra', name: 'Vivo Internet (Fibra)', emoji: '📡', isDefault: true },
      { id: 'vivo-internet-dedicada', name: 'Vivo Internet Dedicada', emoji: '🌐', isDefault: true },
      { id: 'combo-vivo-sip-internet-dedicada', name: 'Combo Vivo SIP + Internet Dedicada', emoji: '📦', isDefault: true },
      { id: 'licencas-microsoft', name: 'Licenças Microsoft', emoji: '💻', isDefault: true },
      { id: 'ajuda-ai', name: 'Ajuda AI', emoji: '🤖', isDefault: true }
    ];

    // Carregar produtos criados dinamicamente
    const adminProducts = JSON.parse(localStorage.getItem('admin-products') || '{}');
    const dynamicProducts = Object.entries(adminProducts).map(([id, fullName]) => {
      const emoji = fullName.split(' ')[0];
      const name = fullName.substring(fullName.indexOf(' ') + 1);
      return { id, name, emoji, isDefault: false };
    });

    // Carregar ordem salva
    const savedOrder = JSON.parse(localStorage.getItem('product-order') || '[]');
    
    // Combinar produtos
    const allProducts = [...defaultProducts, ...dynamicProducts];
    
    // Aplicar ordem salva se existir
    let orderedProducts;
    if (savedOrder.length > 0) {
      orderedProducts = [];
      // Primeiro, adicionar produtos na ordem salva
      savedOrder.forEach(savedId => {
        const product = allProducts.find(p => p.id === savedId);
        if (product) {
          orderedProducts.push(product);
        }
      });
      // Depois, adicionar produtos novos que não estão na ordem salva
      allProducts.forEach(product => {
        if (!savedOrder.includes(product.id)) {
          orderedProducts.push(product);
        }
      });
    } else {
      orderedProducts = allProducts;
    }

    setProducts(orderedProducts);

    // Carregar produtos ocultos
    const savedHiddenProducts = JSON.parse(localStorage.getItem('admin-hidden-products') || '{}');
    setHiddenProducts(savedHiddenProducts);
  };

  const saveOrder = (newProducts) => {
    const order = newProducts.map(p => p.id);
    localStorage.setItem('product-order', JSON.stringify(order));
    setProducts(newProducts);
  };

  const moveProduct = (index, direction) => {
    const newProducts = [...products];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex >= 0 && targetIndex < newProducts.length) {
      [newProducts[index], newProducts[targetIndex]] = [newProducts[targetIndex], newProducts[index]];
      saveOrder(newProducts);
    }
  };

  const toggleProductVisibility = (productId) => {
    const updatedHiddenProducts = { ...hiddenProducts };
    
    if (updatedHiddenProducts[productId]) {
      delete updatedHiddenProducts[productId];
    } else {
      updatedHiddenProducts[productId] = true;
    }
    
    setHiddenProducts(updatedHiddenProducts);
    localStorage.setItem('admin-hidden-products', JSON.stringify(updatedHiddenProducts));
  };

  const deleteProduct = (productId) => {
    if (confirm('Tem certeza que deseja excluir este produto permanentemente?')) {
      // Remover da lista de produtos
      const updatedProducts = products.filter(p => p.id !== productId);
      saveOrder(updatedProducts);

      // Remover do localStorage de produtos admin
      const adminProducts = JSON.parse(localStorage.getItem('admin-products') || '{}');
      delete adminProducts[productId];
      localStorage.setItem('admin-products', JSON.stringify(adminProducts));

      // Remover dados do produto
      localStorage.removeItem(`product-data-${productId}`);
      localStorage.removeItem(`product-page-${productId}`);

      // Remover da lista de produtos ocultos
      const updatedHiddenProducts = { ...hiddenProducts };
      delete updatedHiddenProducts[productId];
      setHiddenProducts(updatedHiddenProducts);
      localStorage.setItem('admin-hidden-products', JSON.stringify(updatedHiddenProducts));

      alert('Produto excluído com sucesso!');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GripVertical className="w-5 h-5" />
          Gerenciar Ordem dos Produtos
        </CardTitle>
        <p className="text-muted-foreground">
          Reordene os produtos no menu lateral, oculte ou exclua produtos conforme necessário.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {products.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>Nenhum produto encontrado.</p>
          </div>
        ) : (
          products.map((product, index) => (
            <div 
              key={product.id} 
              className={`flex items-center justify-between p-4 border rounded-lg ${
                hiddenProducts[product.id] ? 'bg-gray-100 opacity-60' : 'bg-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{product.emoji}</span>
                <div>
                  <h4 className="font-semibold">{product.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {product.isDefault ? 'Produto padrão' : 'Produto criado'}
                    {hiddenProducts[product.id] && ' • Oculto'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Botões de Reordenação */}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => moveProduct(index, 'up')}
                  disabled={index === 0}
                  title="Mover para cima"
                >
                  <ArrowUp className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => moveProduct(index, 'down')}
                  disabled={index === products.length - 1}
                  title="Mover para baixo"
                >
                  <ArrowDown className="w-4 h-4" />
                </Button>
                
                {/* Botão de Visibilidade */}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => toggleProductVisibility(product.id)}
                  className={hiddenProducts[product.id] ? "text-green-600" : "text-orange-600"}
                  title={hiddenProducts[product.id] ? "Mostrar no menu" : "Ocultar do menu"}
                >
                  {hiddenProducts[product.id] ? (
                    <Eye className="w-4 h-4" />
                  ) : (
                    <EyeOff className="w-4 h-4" />
                  )}
                </Button>
                
                {/* Botão de Exclusão (apenas para produtos criados) */}
                {!product.isDefault && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deleteProduct(product.id)}
                    className="text-red-600 hover:text-red-700"
                    title="Excluir produto"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          ))
        )}
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">Instruções:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Use ↑ ↓ para reordenar os produtos no menu lateral</li>
            <li>• Use 👁 para ocultar/mostrar produtos no menu</li>
            <li>• Use 🗑️ para excluir produtos criados (produtos padrão não podem ser excluídos)</li>
            <li>• As alterações são salvas automaticamente</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

