import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot, DollarSign, Zap, ArrowRight, Bell, ExternalLink, Sparkles } from 'lucide-react';
import { loadHomeData } from '@/data/homeData';

export default function Home() {
  const [homeData, setHomeData] = useState(null);
  const [microsoftCards, setMicrosoftCards] = useState([]);
  const [ajudaAiCards, setAjudaAiCards] = useState([]);

  // Carregar dados centralizados da Home
  useEffect(() => {
    const data = loadHomeData();
    setHomeData(data);

    const savedMicrosoftCards = localStorage.getItem('admin-microsoft-cards');
    if (savedMicrosoftCards) {
      setMicrosoftCards(JSON.parse(savedMicrosoftCards));
    }

    const savedAjudaAiCards = localStorage.getItem('admin-ajuda-ai-cards');
    if (savedAjudaAiCards) {
      setAjudaAiCards(JSON.parse(savedAjudaAiCards));
    }
  }, []);

  // Mapear ícones por nome
  const iconMap = {
    Bot,
    DollarSign, 
    Zap
  };

  if (!homeData) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Card de Atualizações - Carregado dos dados centralizados */}
      <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30 shadow-modern">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl gradient-purple flex items-center justify-center shadow-card flex-shrink-0">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {homeData.updates.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {homeData.updates.description}
              </p>
              <p className="text-xs text-muted-foreground/70 mt-2">
                Atualizado em: {homeData.updates.date}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Header - Dados centralizados */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground leading-tight">
          {homeData.welcome.title}
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          {homeData.welcome.message}
        </p>
      </div>

      {/* Features Grid - Dados centralizados */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {homeData.features.map((feature, index) => {
          const IconComponent = iconMap[feature.icon];
          return (
            <Card key={index} className="group hover:shadow-modern transition-all duration-300 hover:-translate-y-1 border-0 shadow-card">
              <CardHeader className="pb-4">
                <div className={`w-12 h-12 rounded-xl ${feature.gradient} flex items-center justify-center mb-4 shadow-card`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
            <CardContent>
              <CardDescription className="text-muted-foreground leading-relaxed">
                {feature.description}
              </CardDescription>
            </CardContent>
          </Card>
          );
        })}
      </div>

      {/* Cards Dinâmicos - Licenças Microsoft */}
      {microsoftCards.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center shadow-card">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Licenças Microsoft</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {microsoftCards.map((card) => (
              <Card key={card.id} className="group hover:shadow-modern transition-all duration-300 hover:-translate-y-1 border-0 shadow-card overflow-hidden">
                <CardContent className="p-0">
                  {/* Header do Card com Gradiente */}
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Bot className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-1">{card.title}</h3>
                        <div className="w-8 h-1 bg-white/30 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Conteúdo do Card */}
                  <div className="p-6">
                    <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                      {card.description}
                    </p>
                    
                    {card.link && (
                      <Button asChild size="sm" className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0 shadow-card hover:shadow-modern transition-all duration-300">
                        <a href={card.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                          Acessar Agora
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Cards Dinâmicos - Ajuda AI */}
      {ajudaAiCards.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center shadow-card">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Ajuda AI</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ajudaAiCards.map((card) => (
              <Card key={card.id} className="group hover:shadow-modern transition-all duration-300 hover:-translate-y-1 border-0 shadow-card overflow-hidden">
                <CardContent className="p-0">
                  {/* Header do Card com Gradiente */}
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Bot className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-1">{card.title}</h3>
                        <div className="w-8 h-1 bg-white/30 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Conteúdo do Card */}
                  <div className="p-6">
                    <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                      {card.description}
                    </p>
                    
                    {card.link && (
                      <Button asChild size="sm" className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0 shadow-card hover:shadow-modern transition-all duration-300">
                        <a href={card.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                          Acessar Agora
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* CTA Section */}
      <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20 shadow-modern">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Comece agora mesmo a usar o sistema
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Dê o próximo passo rumo a resultados ainda melhores: encontre a solução ideal, gere sua proposta e feche negócios com confiança — tudo em um só lugar!
          </p>
          <Button size="lg" className="gradient-purple text-white shadow-card hover:shadow-modern transition-all duration-300 hover:scale-105">
            Explorar Produtos
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

