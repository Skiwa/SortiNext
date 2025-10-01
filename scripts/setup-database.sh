#!/bin/bash

echo "🔧 Configuration de la base de données..."

# Générer le client Prisma
echo "📦 Génération du client Prisma..."
npx prisma generate

# Appliquer les migrations
echo "🗄️ Application des migrations..."
npx prisma migrate dev --name init

echo "✅ Base de données configurée avec succès!"