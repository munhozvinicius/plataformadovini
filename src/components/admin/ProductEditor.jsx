import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Edit, Save, RotateCcw, Plus, Trash2, Edit3 } from 'lucide-react';
import DynamicTable from './DynamicTable';

// Dados padrão para produtos existentes (hardcoded)
const defaultProductData = {
  'vivo-sip': {
    characteristics: 'Com o Vivo SIP, sua empresa tem uma solução de comunicação unificada que integra voz e dados, otimizando custos e melhorando a produtividade. Ideal para empresas que buscam flexibilidade e escalabilidade.',
    characteristicsTitle: 'Características Principais',
    pricingTable: [
      { 'Canal': '30', 'Preço': 'R$ 250,00' },
      { 'Canal': '60', 'Preço': 'R$ 450,00' },
      { 'Canal': '90', 'Preço': 'R$ 600,00' },
    ],
    pricingTableTitle: 'Tabela de Preços',
    observations: 'Observações importantes sobre o Vivo SIP: Necessário ter infraestrutura de rede adequada. Compatível com PABX IP. Suporte 24/7.',
    observationsTitle: 'Observações Importantes',
    aiAgents: [
      { id: 1, title: 'Agente SIP', description: 'Tira dúvidas sobre o Vivo SIP.', url: 'https://www.vivo.com.br/sip' }
    ]
  },
  'vivo-0800': {
    characteristics: 'O serviço Vivo 0800 permite que seus clientes liguem gratuitamente para sua empresa, aumentando a acessibilidade e a satisfação. Perfeito para centrais de atendimento e suporte ao cliente.',
    characteristicsTitle: 'Características Principais',
    pricingTable: [
      { 'Minutos': '100', 'Preço': 'R$ 150,00' },
      { 'Minutos': '500', 'Preço': 'R$ 600,00' },
      { 'Minutos': '1000', 'Preço': 'R$ 1.000,00' },
    ],
    pricingTableTitle: 'Tabela de Preços',
    observations: 'Observações importantes sobre o Vivo 0800: Cobertura nacional. Relatórios de chamadas detalhados. Atendimento personalizado.',
    observationsTitle: 'Observações Importantes',
    aiAgents: [
      { id: 1, title: 'Agente 0800', description: 'Ajuda com configurações do 0800.', url: 'https://www.vivo.com.br/0800' }
    ]
  },
  'vivo-voz-negocios': {
    characteristics: 'Solução completa de telefonia fixa para empresas, com ramais ilimitados e mobilidade. Tenha mais controle e flexibilidade na comunicação do seu negócio.',
    characteristicsTitle: 'Características Principais',
    pricingTable: [
      { 'Ramais': '5', 'Preço': 'R$ 200,00' },
      { 'Ramais': '10', 'Preço': 'R$ 350,00' },
      { 'Ramais': '20', 'Preço': 'R$ 600,00' },
    ],
    pricingTableTitle: 'Tabela de Preços',
    observations: 'Observações importantes sobre Vivo Voz Negócios: Instalação rápida. Suporte técnico especializado. Planos flexíveis.',
    observationsTitle: 'Observações Importantes',
    aiAgents: [
      { id: 1, title: 'Agente Voz', description: 'Dúvidas sobre ramais e planos.', url: 'https://www.vivo.com.br/voz-negocios' }
    ]
  },
  'vivo-internet-fibra': {
    characteristics: 'Internet de ultravelocidade para sua empresa, com estabilidade e segurança. Ideal para quem precisa de alta performance para sistemas em nuvem e videoconferências.',
    characteristicsTitle: 'Características Principais',
    pricingTable: [
      { 'Velocidade': '100 MEGA', 'Preço': 'R$ 150,00' },
      { 'Velocidade': '300 MEGA', 'Preço': 'R$ 250,00' },
      { 'Velocidade': '500 MEGA', 'Preço': 'R$ 350,00' },
    ],
    pricingTableTitle: 'Tabela de Preços',
    observations: 'Observações importantes sobre Vivo Internet Fibra: Disponibilidade sujeita à região. Instalação profissional. Wi-Fi incluso.',
    observationsTitle: 'Observações Importantes',
    aiAgents: [
      { id: 1, title: 'Agente Fibra', description: 'Informações sobre cobertura e planos.', url: 'https://www.vivo.com.br/internet-fibra' }
    ]
  },
  'vivo-internet-dedicada': {
    characteristics: 'Conexão exclusiva e de alta performance para empresas que exigem máxima disponibilidade e segurança. Ideal para data centers, grandes escritórios e operações críticas.',
    characteristicsTitle: 'Características Principais',
    pricingTable: [
      { 'Velocidade': '50 MEGA', 'Preço': 'R$ 500,00' },
      { 'Velocidade': '100 MEGA', 'Preço': 'R$ 800,00' },
      { 'Velocidade': '200 MEGA', 'Preço': 'R$ 1.200,00' },
    ],
    pricingTableTitle: 'Tabela de Preços',
    observations: 'Observações importantes sobre Vivo Internet Dedicada: SLA de 99,9%. Suporte prioritário. IP fixo.',
    observationsTitle: 'Observações Importantes',
    aiAgents: [
      { id: 1, title: 'Agente Dedicada', description: 'Detalhes sobre a conexão dedicada.', url: 'https://www.vivo.com.br/internet-dedicada' }
    ]
  },
  'combo-vivo-sip-internet-dedicada': {
    characteristics: 'Combine o melhor da comunicação unificada com a internet de alta performance. Tenha voz e dados integrados para otimizar suas operações e reduzir custos.',
    characteristicsTitle: 'Características Principais',
    pricingTable: [
      { 'Serviços': 'SIP + 50M Fibra', 'Preço': 'R$ 700,00' },
      { 'Serviços': 'SIP + 100M Fibra', 'Preço': 'R$ 950,00' },
      { 'Serviços': 'SIP + 200M Fibra', 'Preço': 'R$ 1.350,00' },
    ],
    pricingTableTitle: 'Tabela de Preços',
    observations: 'Observações importantes sobre o Combo: Desconto especial na contratação conjunta. Instalação unificada. Suporte integrado.',
    observationsTitle: 'Observações Importantes',
    aiAgents: [
      { id: 1, title: 'Agente Combo', description: 'Informações sobre os combos Vivo.', url: 'https://www.vivo.com.br/combos' }
    ]
  },
  'licencas-microsoft': {
    characteristics: 'Tenha acesso às melhores ferramentas de produtividade da Microsoft, como Office 365, Teams e SharePoint. Aumente a colaboração e a eficiência da sua equipe.',
    characteristicsTitle: 'Características Principais',
    pricingTable: [
      { 'Licença': 'Office 365 Basic', 'Preço': 'R$ 30,00/mês' },
      { 'Licença': 'Office 365 Standard', 'Preço': 'R$ 50,00/mês' },
      { 'Licença': 'Office 365 Premium', 'Preço': 'R$ 80,00/mês' },
    ],
    pricingTableTitle: 'Tabela de Preços',
    observations: 'Observações importantes sobre Licenças Microsoft: Planos flexíveis por usuário. Suporte técnico especializado. Atualizações automáticas.',
    observationsTitle: 'Observações Importantes',
    aiAgents: [
      { id: 1, title: 'Agente Microsoft', description: 'Dúvidas sobre licenciamento Microsoft.', url: 'https://www.microsoft.com/pt-br/microsoft-365' }
    ]
  },
  'ajuda-ai': {
    characteristics: 'Nosso agente de IA está pronto para te ajudar com dúvidas e informações sobre todos os produtos Vivo. Tenha suporte rápido e eficiente a qualquer momento.',
    characteristicsTitle: 'Características Principais',
    pricingTable: [],
    pricingTableTitle: 'Tabela de Preços',
    observations: 'Observações importantes sobre Ajuda AI: Disponível 24/7. Respostas rápidas e precisas. Em constante aprendizado.',
    observationsTitle: 'Observações Importantes',
    aiAgents: [
      { id: 1, title: 'Agente de Suporte', description: 'Agente de IA para suporte geral.', url: 'https://www.vivo.com.br/ajuda-ai' }
    ]
  },
};

export default function ProductEditor({ productId }) {
  const [productData, setProductData] = useState({
    characteristics: '',
    characteristicsTitle: 'Características Principais',
    pricingTable: [],
    pricingTableTitle: 'Tabela de Preços',
    observations: '',
    observationsTitle: 'Observações Importantes',
    aiAgents: []
  });
  const [initialProductData, setInitialProductData] = useState(null); // Para verificar alterações
  const [hasChanges, setHasChanges] = useState(false);
  const [editingTitles, setEditingTitles] = useState({
    characteristics: false,
    pricing: false,
    observations: false
  });

  useEffect(() => {
    const loadProduct = () => {
      const savedData = localStorage.getItem(`product-data-${productId}`);
      let dataToLoad = {};

      if (savedData) {
        try {
          dataToLoad = JSON.parse(savedData);
        } catch (error) {
          console.error('Erro ao carregar dados do produto do localStorage:', error);
          // Fallback para dados padrão se houver erro no parse
          dataToLoad = defaultProductData[productId] || {
            characteristics: '',
            characteristicsTitle: 'Características Principais',
            pricingTable: [],
            pricingTableTitle: 'Tabela de Preços',
            observations: '',
            observationsTitle: 'Observações Importantes',
            aiAgents: []
          };
        }
      } else {
        // Se não houver dados salvos, tentar carregar dos dados padrão hardcoded
        dataToLoad = defaultProductData[productId] || {
          characteristics: '',
          characteristicsTitle: 'Características Principais',
          pricingTable: [],
          pricingTableTitle: 'Tabela de Preços',
          observations: '',
          observationsTitle: 'Observações Importantes',
          aiAgents: []
        };
      }
      
      setProductData(dataToLoad);
      setInitialProductData(dataToLoad);
      setHasChanges(false);
    };

    loadProduct();
  }, [productId]);

  useEffect(() => {
    // Verifica se há alterações comparando com os dados iniciais
    if (initialProductData) {
      setHasChanges(JSON.stringify(productData) !== JSON.stringify(initialProductData));
    }
  }, [productData, initialProductData]);

  const handleSave = () => {
    localStorage.setItem(`product-data-${productId}`, JSON.stringify(productData));
    setInitialProductData(productData); // Atualiza os dados iniciais após salvar
    setHasChanges(false);
    alert('Dados salvos com sucesso!');
  };

  const handleReset = () => {
    if (confirm('Esta ação irá restaurar todos os dados deste produto para os valores padrão. Todas as alterações não salvas serão perdidas. Deseja continuar?')) {
      const resetData = defaultProductData[productId] || {
        characteristics: '',
        characteristicsTitle: 'Características Principais',
        pricingTable: [],
        pricingTableTitle: 'Tabela de Preços',
        observations: '',
        observationsTitle: 'Observações Importantes',
        aiAgents: []
      };
      setProductData(resetData);
      setInitialProductData(resetData);
      setHasChanges(false);
      alert('Dados restaurados para o padrão!');
    }
  };

  const updateField = (field, value) => {
    setProductData(prev => ({ ...prev, [field]: value }));
  };

  const addAiAgent = () => {
    const newAgent = {
      id: Date.now(),
      title: '',
      description: '',
      url: ''
    };
    setProductData(prev => ({
      ...prev,
      aiAgents: [...prev.aiAgents, newAgent]
    }));
  };

  const updateAiAgent = (agentId, field, value) => {
    setProductData(prev => ({
      ...prev,
      aiAgents: prev.aiAgents.map(agent =>
        agent.id === agentId ? { ...agent, [field]: value } : agent
      )
    }));
  };

  const removeAiAgent = (agentId) => {
    setProductData(prev => ({
      ...prev,
      aiAgents: prev.aiAgents.filter(agent => agent.id !== agentId)
    }));
  };

  const handleTitleEdit = (section, newTitle) => {
    updateField(`${section}Title`, newTitle);
    setEditingTitles(prev => ({ ...prev, [section]: false }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">{productId}</h3> {/* Exibir o ID do produto por enquanto */}
          <p className="text-muted-foreground">Edite o conteúdo e preços do produto</p>
        </div>
        <div className="flex gap-2">
          {hasChanges && (
            <Badge variant="outline" className="text-orange-600 bg-orange-50">
              <Edit className="w-3 h-3 mr-1" />
              Alterações não salvas
            </Badge>
          )}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm">
                <RotateCcw className="w-4 h-4 mr-1" />
                Restaurar Padrão
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Restaurar dados padrão?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta ação irá restaurar todos os dados deste produto para os valores padrão. Todas as alterações serão perdidas.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleReset}>
                  Restaurar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Button onClick={handleSave} disabled={!hasChanges}>
            <Save className="w-4 h-4 mr-1" />
            Salvar Alterações
          </Button>
        </div>
      </div>

      <Tabs defaultValue="characteristics" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="characteristics">Características</TabsTrigger>
          <TabsTrigger value="pricing">Tabela de Preços</TabsTrigger>
          <TabsTrigger value="observations">Observações</TabsTrigger>
          <TabsTrigger value="ai-agents">Agentes IA</TabsTrigger>
        </TabsList>

        <TabsContent value="characteristics" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                {editingTitles.characteristics ? (
                  <Input
                    value={productData.characteristicsTitle}
                    onChange={(e) => updateField('characteristicsTitle', e.target.value)}
                    onBlur={() => handleTitleEdit('characteristics', productData.characteristicsTitle)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleTitleEdit('characteristics', productData.characteristicsTitle);
                      }
                    }}
                    className="text-lg font-semibold"
                    autoFocus
                  />
                ) : (
                  <CardTitle 
                    className="cursor-pointer hover:text-blue-600 flex items-center gap-2"
                    onClick={() => setEditingTitles(prev => ({ ...prev, characteristics: true }))}
                  >
                    {productData.characteristicsTitle}
                    <Edit3 className="w-4 h-4 opacity-50" />
                  </CardTitle>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                Descreva os principais benefícios e características do produto.
              </p>
            </CardHeader>
            <CardContent>
              <Textarea
                value={productData.characteristics}
                onChange={(e) => updateField('characteristics', e.target.value)}
                placeholder="Descreva as características principais do produto..."
                rows={8}
                className="w-full"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                {editingTitles.pricing ? (
                  <Input
                    value={productData.pricingTableTitle}
                    onChange={(e) => updateField('pricingTableTitle', e.target.value)}
                    onBlur={() => handleTitleEdit('pricing', productData.pricingTableTitle)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleTitleEdit('pricing', productData.pricingTableTitle);
                      }
                    }}
                    className="text-lg font-semibold"
                    autoFocus
                  />
                ) : (
                  <CardTitle 
                    className="cursor-pointer hover:text-blue-600 flex items-center gap-2"
                    onClick={() => setEditingTitles(prev => ({ ...prev, pricing: true }))}
                  >
                    {productData.pricingTableTitle}
                    <Edit3 className="w-4 h-4 opacity-50" />
                  </CardTitle>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                Configure os preços do produto. Preços alterados serão destacados em cores.
              </p>
            </CardHeader>
            <CardContent>
              <DynamicTable
                title={productData.pricingTableTitle}
                data={productData.pricingTable}
                onDataChange={(newData) => updateField('pricingTable', newData)}
                onTitleChange={(newTitle) => updateField('pricingTableTitle', newTitle)}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="observations" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                {editingTitles.observations ? (
                  <Input
                    value={productData.observationsTitle}
                    onChange={(e) => updateField('observationsTitle', e.target.value)}
                    onBlur={() => handleTitleEdit('observations', productData.observationsTitle)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleTitleEdit('observations', productData.observationsTitle);
                      }
                    }}
                    className="text-lg font-semibold"
                    autoFocus
                  />
                ) : (
                  <CardTitle 
                    className="cursor-pointer hover:text-blue-600 flex items-center gap-2"
                    onClick={() => setEditingTitles(prev => ({ ...prev, observations: true }))}
                  >
                    {productData.observationsTitle}
                    <Edit3 className="w-4 h-4 opacity-50" />
                  </CardTitle>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                Adicione observações importantes sobre o produto.
              </p>
            </CardHeader>
            <CardContent>
              <Textarea
                value={productData.observations}
                onChange={(e) => updateField('observations', e.target.value)}
                placeholder="Adicione observações importantes..."
                rows={8}
                className="w-full"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-agents" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Agentes IA</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Gerencie os agentes de IA associados a este produto.
                  </p>
                </div>
                <Button onClick={addAiAgent}>
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Agente
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {productData.aiAgents.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Nenhum agente IA configurado.</p>
                  <p className="text-sm">Clique em "Adicionar Agente" para começar.</p>
                </div>
              ) : (
                productData.aiAgents.map((agent) => (
                  <div key={agent.id} className="border p-4 rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Título do Agente</Label>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeAiAgent(agent.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <Input
                      value={agent.title}
                      onChange={(e) => updateAiAgent(agent.id, 'title', e.target.value)}
                      placeholder="Nome do agente IA"
                    />
                    <div>
                      <Label>Descrição</Label>
                      <Textarea
                        value={agent.description}
                        onChange={(e) => updateAiAgent(agent.id, 'description', e.target.value)}
                        placeholder="Descrição do agente IA"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label>Link de Acesso</Label>
                      <Input
                        value={agent.url}
                        onChange={(e) => updateAiAgent(agent.id, 'url', e.target.value)}
                        placeholder="URL do agente IA"
                      />
                    </div>
                    {agent.url && (
                      <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                        Acessar {agent.title || 'Agente IA'}
                      </Button>
                    )}
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}




