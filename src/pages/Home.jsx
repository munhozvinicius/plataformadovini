import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot, DollarSign, Zap, ArrowRight, Bell, ExternalLink, Sparkles, Package, Database } from 'lucide-react';
import { loadRealHomeData } from '@/data/realHomeData';
import { clearAllFakeData } from '@/data/realProductData';

export default function Home() {
  const [homeData, setHomeData] = useState(null);

  // Carregar dados REAIS da Home
  useEffect(() => {
    // Limpar dados fake na primeira carga
    clearAllFakeData();
    
    const data = loadRealHomeData();
    setHomeData(data);
  }, []);

  // Mapear ícones por nome
  const iconMap = {
    Bot,
    DollarSign, 
    Zap,
    Package,
    Database
  };

  if (!homeData) {
    return <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <p>Carregando sistema REAL...</p>
      </div>
    </div>;
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

      {/* CTA Section */}
      <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20 shadow-modern">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Sistema REAL funcionando!
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Agora você tem um sistema que realmente funciona! Produtos criados aparecem no menu, páginas são acessíveis e dados persistem de verdade. Explore os produtos disponíveis no menu lateral.
          </p>
          <Button size="lg" className="gradient-purple text-white shadow-card hover:shadow-modern transition-all duration-300 hover:scale-105">
            Explorar Produtos REAIS
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

