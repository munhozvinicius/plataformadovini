import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExternalLink, Star, DollarSign, FileText, Bot, ArrowLeft } from 'lucide-react';
import { loadProductData } from '@/data/productData';

export default function DynamicProductPage() {
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    loadProductDataLocal();
  }, [productId]);

  const loadProductDataLocal = () => {
    try {
      const data = loadProductData(productId);
      
      if (!data) {
        setNotFound(true);
        setLoading(false);
        return;
      }
      
      setProductData(data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar produto:', error);
      setNotFound(true);
      setLoading(false);
    }
  };

  const renderPricingTable = (tableData) => {
    if (!tableData || tableData.length === 0) {
      return (
        <div className="text-center py-8 text-muted-foreground">
          <p>Nenhuma informação de preços disponível.</p>
        </div>
      );
    }

    const columns = Object.keys(tableData[0] || {});
    
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-purple-600 text-white">
              {columns.map((column) => (
                <th key={column} className="border border-purple-500 px-4 py-3 text-left font-semibold">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                {columns.map((column) => (
                  <td key={column} className="border border-gray-300 px-4 py-3">
                    {row[column] || '-'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-8"></div>
          <div className="space-y-4">
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (notFound) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header com botão de voltar */}
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="ghost" 
          onClick={() => window.history.back()}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Início
        </Button>
      </div>

      {/* Header do produto - seguindo padrão das páginas existentes */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-4">
          <span className="text-6xl">{productData.emoji}</span>
          <div>
            <h1 className="text-4xl font-bold text-foreground">{productData.name}</h1>
            <p className="text-muted-foreground">Produto Vivo</p>
          </div>
        </div>
      </div>

      {/* Content Tabs - seguindo padrão das páginas existentes */}
      <Tabs defaultValue="characteristics" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="characteristics" className="flex items-center gap-2">
            <Star className="w-4 h-4" />
            Características Principais
          </TabsTrigger>
          <TabsTrigger value="pricing" className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Tabela de Preços
          </TabsTrigger>
          <TabsTrigger value="observations" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Observações Importantes
          </TabsTrigger>
          <TabsTrigger value="ai-agents" className="flex items-center gap-2">
            <Bot className="w-4 h-4" />
            Agentes IA
          </TabsTrigger>
        </TabsList>

        <TabsContent value="characteristics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-purple-600" />
                {productData.characteristicsTitle}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {productData.characteristics ? (
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {productData.characteristics}
                  </p>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Nenhuma característica definida ainda.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                {productData.pricingTableTitle}
              </CardTitle>
              <p className="text-gray-600">Confira nossos planos e valores atualizados</p>
            </CardHeader>
            <CardContent>
              {renderPricingTable(productData.pricingTable)}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="observations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                {productData.observationsTitle}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {productData.observations ? (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <span className="text-yellow-400 text-xl">⚠️</span>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800">
                        Fique Atento!
                      </h3>
                      <div className="mt-2 text-sm text-yellow-700 whitespace-pre-wrap">
                        {productData.observations}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Nenhuma observação definida ainda.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-agents" className="space-y-6">
          {productData.aiAgents && productData.aiAgents.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {productData.aiAgents.map((agent) => (
                <Card key={agent.id} className="border-2 border-purple-100">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bot className="w-5 h-5 text-purple-600" />
                      {agent.title || 'Agente IA'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {agent.description && (
                      <p className="text-gray-600 text-sm">
                        {agent.description}
                      </p>
                    )}
                    {agent.url && (
                      <Button 
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                        onClick={() => window.open(agent.url, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Acessar {agent.title || 'Agente IA'}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <Bot className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Nenhum agente IA configurado para este produto.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

