import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log(' Iniciando seed do banco de dados...\n');

  console.log(' Verificando atividades...');
  
  const activityData = [
    // Higiene
    { name: 'Escovar Dentes', icon: '🦷', color: '#3B82F6', category: 'Higiene', coins: 5, isDefault: true, description: 'Escovar os dentes após as refeições' },
    { name: 'Tomar Banho', icon: '🚿', color: '#06B6D4', category: 'Higiene', coins: 10, isDefault: true, description: 'Tomar banho completo' },
    { name: 'Lavar as Mãos', icon: '🧼', color: '#8B5CF6', category: 'Higiene', coins: 3, isDefault: true, description: 'Lavar as mãos com sabão' },
    
    // Alimentação
    { name: 'Café da Manhã', icon: '🍳', color: '#F59E0B', category: 'Alimentação', coins: 10, isDefault: true, description: 'Primeira refeição do dia' },
    { name: 'Almoço', icon: '🍽️', color: '#EF4444', category: 'Alimentação', coins: 10, isDefault: true, description: 'Refeição do meio-dia' },
    { name: 'Jantar', icon: '🍲', color: '#F97316', category: 'Alimentação', coins: 10, isDefault: true, description: 'Refeição da noite' },
    { name: 'Lanche', icon: '🍎', color: '#84CC16', category: 'Alimentação', coins: 5, isDefault: true, description: 'Lanche saudável' },
    
    // Educação
    { name: 'Lição de Casa', icon: '✏️', color: '#10B981', category: 'Educação', coins: 20, isDefault: true, description: 'Fazer tarefas escolares' },
    { name: 'Ler Livro', icon: '📚', color: '#8B5CF6', category: 'Educação', coins: 15, isDefault: true, description: 'Ler por pelo menos 15 minutos' },
    { name: 'Estudar', icon: '📖', color: '#6366F1', category: 'Educação', coins: 20, isDefault: true, description: 'Tempo de estudo' },
    
    // Lazer
    { name: 'Brincar', icon: '🎮', color: '#EC4899', category: 'Lazer', coins: 10, isDefault: true, description: 'Tempo livre para brincar' },
    { name: 'Desenhar', icon: '🎨', color: '#F59E0B', category: 'Lazer', coins: 10, isDefault: true, description: 'Atividade artística' },
    { name: 'Assistir TV', icon: '📺', color: '#A855F7', category: 'Lazer', coins: 5, isDefault: true, description: 'Tempo de tela controlado' },
    
    // Sono
    { name: 'Dormir', icon: '😴', color: '#6366F1', category: 'Sono', coins: 10, isDefault: true, description: 'Hora de dormir' },
    { name: 'Soneca', icon: '💤', color: '#818CF8', category: 'Sono', coins: 5, isDefault: true, description: 'Cochilo da tarde' },
    
    // Atividades Físicas
    { name: 'Caminhar', icon: '🚶', color: '#10B981', category: 'Atividade Física', coins: 15, isDefault: true, description: 'Caminhada leve por 15-20 minutos' },
    { name: 'Pular Corda', icon: '🪢', color: '#EF4444', category: 'Atividade Física', coins: 15, isDefault: true, description: 'Exercício cardiovascular divertido' },
    { name: 'Dançar', icon: '💃', color: '#EC4899', category: 'Atividade Física', coins: 15, isDefault: true, description: 'Dançar ao som de músicas favoritas' },
    { name: 'Andar de Bicicleta', icon: '🚴', color: '#3B82F6', category: 'Atividade Física', coins: 20, isDefault: true, description: 'Pedalar na rua ou bicicleta ergométrica' },
    { name: 'Alongamento', icon: '🧘', color: '#8B5CF6', category: 'Atividade Física', coins: 10, isDefault: true, description: 'Exercícios de alongamento suave' },
    { name: 'Jogar Bola', icon: '⚽', color: '#F97316', category: 'Atividade Física', coins: 15, isDefault: true, description: 'Jogar bola no quintal ou parque' },
    { name: 'Nadar', icon: '🏊', color: '#06B6D4', category: 'Atividade Física', coins: 20, isDefault: true, description: 'Natação - excelente para autismo' },
   
    
    // Relaxamento e Concentração
    { name: 'Respiração Profunda', icon: '🌬️', color: '#06B6D4', category: 'Relaxamento', coins: 10, isDefault: true, description: 'Exercícios de respiração para acalmar' },
    { name: 'Yoga para Crianças', icon: '🧘', color: '#8B5CF6', category: 'Relaxamento', coins: 15, isDefault: true, description: 'Posturas simples de yoga' },
    { name: 'Ouvir Música Calma', icon: '🎵', color: '#818CF8', category: 'Relaxamento', coins: 10, isDefault: true, description: 'Músicas relaxantes ou preferidas' },
    { name: 'Brincar com Massinha', icon: '🎨', color: '#F59E0B', category: 'Relaxamento', coins: 10, isDefault: true, description: 'Atividade sensorial calmante' },
    { name: 'Quebra-cabeça', icon: '🧩', color: '#10B981', category: 'Concentração', coins: 15, isDefault: true, description: 'Desenvolve foco e paciência' },
    { name: 'Colorir', icon: '🖍️', color: '#A855F7', category: 'Concentração', coins: 15, isDefault: true, description: 'Atividade relaxante e focada' },
    { name: 'Contar Histórias', icon: '📖', color: '#EF4444', category: 'Concentração', coins: 15, isDefault: true, description: 'Ouvir ou contar histórias' },
    { name: 'Brincadeira com Areia', icon: '🏖️', color: '#F59E0B', category: 'Relaxamento', coins: 10, isDefault: true, description: 'Caixa de areia - estímulo sensorial' },
    { name: 'Bolhas de Sabão', icon: '🫧', color: '#06B6D4', category: 'Relaxamento', coins: 5, isDefault: true, description: 'Soprar e estourar bolhas - diversão calmante' },
    { name: 'Abraço Apertado', icon: '🤗', color: '#EC4899', category: 'Relaxamento', coins: 5, isDefault: true, description: 'Pressão profunda para acalmar' },
    { name: 'Balanço', icon: '🎪', color: '#8B5CF6', category: 'Relaxamento', coins: 10, isDefault: true, description: 'Movimento rítmico calmante' },
  ];
  let activitiesCreated = 0;
  let activitiesExisting = 0;

  for (const activity of activityData) {
    const existing = await prisma.activity.findFirst({
      where: { name: activity.name }
    });

    if (!existing) {
      await prisma.activity.create({ data: activity });
      activitiesCreated++;
      console.log(`  ✅ Criada: ${activity.name}`);
    } else {
      activitiesExisting++;
      console.log(`  ⏭️  Já existe: ${activity.name}`);
    }
  }

  console.log(`\n📊 Atividades: ${activitiesCreated} criadas, ${activitiesExisting} já existiam\n`);

  
  // CONQUISTAS PADRÃO
  
  console.log('🏆 Verificando conquistas...');

  const achievementData = [
    { 
      name: 'Primeira Tarefa', 
      description: 'Complete sua primeira tarefa!', 
      icon: '🌟', 
      condition: 'tasks', 
      threshold: 1 
    },
    { 
      name: 'Iniciante', 
      description: 'Complete 10 tarefas', 
      icon: '⭐', 
      condition: 'tasks', 
      threshold: 10 
    },
    { 
      name: 'Coletor', 
      description: 'Acumule 50 moedas', 
      icon: '💰', 
      condition: 'coins', 
      threshold: 50 
    },
    { 
      name: 'Super Coletor', 
      description: 'Acumule 100 moedas', 
      icon: '💎', 
      condition: 'coins', 
      threshold: 100 
    },
    { 
      name: 'Milionário', 
      description: 'Acumule 500 moedas', 
      icon: '💵', 
      condition: 'coins', 
      threshold: 500 
    },
    { 
      name: 'Dedicado', 
      description: '7 dias seguidos completando tarefas', 
      icon: '🔥', 
      condition: 'streak', 
      threshold: 7 
    },
    { 
      name: 'Campeão', 
      description: '30 dias seguidos completando tarefas', 
      icon: '🏆', 
      condition: 'streak', 
      threshold: 30 
    },
    { 
      name: 'Lendário', 
      description: '100 dias seguidos completando tarefas', 
      icon: '👑', 
      condition: 'streak', 
      threshold: 100 
    },
    { 
      name: 'Nível 5', 
      description: 'Alcance o nível 5', 
      icon: '⚡', 
      condition: 'level', 
      threshold: 5 
    },
    { 
      name: 'Mestre da Rotina', 
      description: 'Alcance o nível 10', 
      icon: '👑', 
      condition: 'level', 
      threshold: 10 
    },
  ];

  let achievementsCreated = 0;
  let achievementsExisting = 0;

  for (const achievement of achievementData) {
    const existing = await prisma.achievement.findUnique({
      where: { name: achievement.name }
    });

    if (!existing) {
      await prisma.achievement.create({ data: achievement });
      achievementsCreated++;
      console.log(`  ✅ Criada: ${achievement.name}`);
    } else {
      achievementsExisting++;
      console.log(`  ⏭️  Já existe: ${achievement.name}`);
    }
  }

  console.log(`\n📊 Conquistas: ${achievementsCreated} criadas, ${achievementsExisting} já existiam\n`);

  
  const totalActivities = await prisma.activity.count();
  const totalAchievements = await prisma.achievement.count();
  const totalUsers = await prisma.user.count();
  const totalChildren = await prisma.child.count();

  console.log('✅ Seed concluído com sucesso!\n');
  console.log('📊 RESUMO DO BANCO:');
  console.log(`   👥 Usuários: ${totalUsers}`);
  console.log(`   👶 Crianças: ${totalChildren}`);
  console.log(`   📋 Atividades: ${totalActivities}`);
  console.log(`   🏆 Conquistas: ${totalAchievements}`);
  console.log('\n🎯 Pronto para usar!\n');
}

main()
  .catch((e) => {
    console.error('\n❌ Erro no seed:', e.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });