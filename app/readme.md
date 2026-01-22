# Tutoriel Expo Router : Navigation Liste → Détail Produit

## 1. Structure du projet

```
app/
├── (tabs)/
│   ├── _layout.tsx
│   ├── index.tsx (liste des produits)
│   └── profile.tsx
├── products/
│   ├── _layout.tsx
│   └── [id].tsx (détail du produit)
└── _layout.tsx
```

## 2. Installation et configuration

```bash
npx create-expo-app myapp
cd myapp
npx expo install expo-router react-native-safe-area-context react-native-screens
npx expo install expo-constants
```

## 3. Types TypeScript

### Créer `types/product.ts`

```typescript
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating: number;
}
```

### Créer `data/products.ts` (données mockées)

```typescript
import { Product } from '../types/product';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'MacBook Pro',
    price: 1299,
    description: 'Ordinateur portable haute performance avec processeur M2',
    image: 'https://via.placeholder.com/200?text=MacBook',
    category: 'Électronique',
    rating: 4.8
  },
  {
    id: '2',
    name: 'iPhone 15',
    price: 999,
    description: 'Dernier modèle iPhone avec caméra améliorée',
    image: 'https://via.placeholder.com/200?text=iPhone',
    category: 'Téléphones',
    rating: 4.7
  },
  {
    id: '3',
    name: 'AirPods Pro',
    price: 249,
    description: 'Écouteurs sans fil avec suppression active du bruit',
    image: 'https://via.placeholder.com/200?text=AirPods',
    category: 'Audio',
    rating: 4.6
  },
  {
    id: '4',
    name: 'iPad Air',
    price: 599,
    description: 'Tablette polyvalente avec écran Retina',
    image: 'https://via.placeholder.com/200?text=iPad',
    category: 'Tablettes',
    rating: 4.5
  }
];
```

## 4. Configuration layout principal

### `app/_layout.tsx`

```typescript
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#f5f5f5',
        },
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="products/[id]"
        options={{
          title: 'Détails du produit',
          headerBackTitle: 'Retour',
        }}
      />
    </Stack>
  );
}
```

## 5. Layout avec tabs

### `app/(tabs)/_layout.tsx`

```typescript
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#007AFF',
        headerStyle: {
          backgroundColor: '#f5f5f5',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Produits',
          tabBarIcon: ({ color }) => (
            <Ionicons name="list" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
```

## 6. Écran liste des produits

### `app/(tabs)/index.tsx`

```typescript
import { FlatList, View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { PRODUCTS } from '../../data/products';

export default function ProductsScreen() {
  const router = useRouter();

  const handleProductPress = (id: string) => {
    // Navigation vers le détail du produit
    router.push(`/products/${id}`);
  };

  const renderProductCard = ({ item }) => (
    <Pressable
      style={styles.card}
      onPress={() => handleProductPress(item.id)}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.price}>${item.price}</Text>
          <Text style={styles.rating}>⭐ {item.rating}</Text>
        </View>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={PRODUCTS}
        renderItem={renderProductCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        scrollEnabled
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flexDirection: 'row',
  },
  image: {
    width: 120,
    height: 120,
    backgroundColor: '#e0e0e0',
  },
  content: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  rating: {
    fontSize: 14,
    color: '#FFA500',
  },
});
```

## 7. Écran détail du produit

### `app/products/_layout.tsx`

```typescript
import { Stack } from 'expo-router';

export default function ProductsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
      }}
    />
  );
}
```

### `app/products/[id].tsx`

```typescript
import { View, Text, Image, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { PRODUCTS } from '../../data/products';

export default function ProductDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  // Récupérer le produit avec l'ID
  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Produit non trouvé</Text>
      </View>
    );
  }

  const handleAddToCart = () => {
    Alert.alert('Succès', `${product.name} ajouté au panier`);
  };

  const handleBuyNow = () => {
    Alert.alert('Achat', `Achat de ${product.name} pour $${product.price}`);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Image du produit */}
      <Image
        source={{ uri: product.image }}
        style={styles.image}
      />

      {/* Informations du produit */}
      <View style={styles.content}>
        <Text style={styles.title}>{product.name}</Text>
        
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>⭐ {product.rating}</Text>
          <Text style={styles.category}>{product.category}</Text>
        </View>

        <Text style={styles.price}>${product.price}</Text>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>
            {product.description}
          </Text>
        </View>

        {/* Détails additionnels */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Détails</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>SKU:</Text>
            <Text style={styles.detailValue}>PROD-{product.id}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Catégorie:</Text>
            <Text style={styles.detailValue}>{product.category}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Disponibilité:</Text>
            <Text style={styles.detailValue}>En stock</Text>
          </View>
        </View>

        {/* Boutons d'action */}
        <View style={styles.buttonsContainer}>
          <Pressable
            style={[styles.button, styles.buttonSecondary]}
            onPress={handleAddToCart}
          >
            <Text style={styles.buttonTextSecondary}>
              Ajouter au panier
            </Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonPrimary]}
            onPress={handleBuyNow}
          >
            <Text style={styles.buttonTextPrimary}>
              Acheter maintenant
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
    backgroundColor: '#e0e0e0',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  rating: {
    fontSize: 14,
    marginRight: 12,
    color: '#FFA500',
  },
  category: {
    fontSize: 12,
    backgroundColor: '#e3f2fd',
    color: '#007AFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  detailRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  detailLabel: {
    fontSize: 14,
    color: '#999',
    width: '40%',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonPrimary: {
    backgroundColor: '#007AFF',
  },
  buttonSecondary: {
    backgroundColor: '#f0f0f0',
  },
  buttonTextPrimary: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  buttonTextSecondary: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  errorText: {
    fontSize: 16,
    color: '#666',
  },
});
```

## 8. Écran profil (simple)

### `app/(tabs)/profile.tsx`

```typescript
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Écran Profil</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
  },
});
```

## 9. Points clés à retenir

### Navigation avec `useRouter()`
```typescript
const router = useRouter();
router.push(`/products/${id}`); // Navigation vers détail
router.back(); // Retour en arrière
```

### Récupération des paramètres avec `useLocalSearchParams()`
```typescript
const { id } = useLocalSearchParams();
```

### Structure des fichiers
- `[id].tsx` = fichier dynamique qui capture le paramètre `id`
- `_layout.tsx` = configuration du layout du dossier

### Navigation automatique
- Back button s'ajoute automatiquement en iOS/Android
- `headerBackTitle` personnalise le texte du bouton retour

## 10. Améliorations possibles

1. **Ajouter une barre de recherche** dans la liste
2. **Implémenter un panier** avec Context API ou Redux
3. **Ajouter des animations** avec React Native Reanimated
4. **Charger les produits d'une API** avec fetch/axios
5. **Ajouter des favoris** avec AsyncStorage
6. **Paginer les résultats**

## 11. Commandes utiles

```bash
# Lancer le projet
npx expo start

# Ouvrir sur iOS
npx expo start --ios

# Ouvrir sur Android
npx expo start --android

# Créer un build de production
npx eas build
```

Bon développement ! 🚀