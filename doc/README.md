Ce README fournit un aperçu du code développé et inclut la documentation sur la façon de télécharger des données GeoJSON sur une carte OpenLayers. Il aborde également l'alternative d'utiliser un GeoServer pour améliorer les performances et le déploiement de l'application. IL abordera également le coté spatialisation et récuperation des données. 

# Présentation du code
Le code se compose de deux parties principales : main.js et chart.js. Le fichier main.js gère l'initialisation de la carte, le chargement et l'affichage des données GeoJSON sur la carte, ainsi que la gestion de la visibilité des couches. Le fichier chart.js est responsable de la création de diagrammes à barres, de diagrammes linéaires et de diagrammes en secteurs polaires à l'aide de la bibliothèque Chart.js.

# Main.js
Le fichier main.js initialise la carte OpenLayers et ajoute les couches de base. Il définit ensuite une fonction loadGeoJSON qui charge les données GeoJSON à partir d'un fichier et les ajoute en tant que couche vectorielle sur la carte. La fonction prend des paramètres tels que le chemin du fichier, les options, le titre, le groupe de couches et les couleurs. Elle met également en place une interaction de clic pour afficher une fenêtre contextuelle avec des informations sur l'entité cliquée.

Le code déclare des variables pour les couches de population et d'artificialisation, y compris leurs chemins de fichier, options, titres et couleurs. Il appelle la fonction loadGeoJSON pour charger et afficher les couches respectives sur la carte. La visibilité des couches est gérée à l'aide de cases à cocher.

# Chart.js
Le fichier chart.js définit des fonctions pour créer des diagrammes à barres, des diagrammes linéaires et des diagrammes en secteurs polaires à l'aide de la bibliothèque Chart.js. La fonction CreatebarChart charge les données à partir d'un fichier GeoJSON, extrait les données pour l'axe des abscisses et l'axe des ordonnées, et crée un diagramme à barres avec l'étiquette et la couleur spécifiées.

La fonction CreateLineChart charge les données à partir de deux fichiers GeoJSON, extrait les données pour les ensembles de données et crée un diagramme linéaire avec deux ensembles de données et une étiquette et une couleur spécifiées. La fonction prend également un paramètre de plage de région pour spécifier la plage de données pour le diagramme.

La fonction CreatePolarAreaChart charge les données à partir de deux fichiers GeoJSON, extrait les données pour les ensembles de données et crée un diagramme en secteurs polaires avec deux ensembles de données et une étiquette et une couleur spécifiées. La fonction prend également un paramètre de plage de région pour spécifier la plage de données pour le diagramme.

# Téléchargement des données GeoJSON
Pour télécharger des données GeoJSON  :

Défininir le chemin du fichier, les options, le titre et les couleurs pour la couche GeoJSON que l'on souhaite charger.
Appeler la fonction loadGeoJSON avec les paramètres appropriés pour charger les données GeoJSON et les ajouter en tant que couche vectorielle sur la carte.
Personnaliser le code en ajoutant des interactions supplémentaires ou en modifiant les styles des couches.

# Utilisation de GeoServer
GeoServer est un serveur d'application open source conçu pour partager des données spatiales sur le Web. Pour améliorer les performances et le déploiement d'une application utilisant OpenLayers et GeoJSON, ons peut utiliser GeoServer pour servir les données spatiales au format GeoJSON ou en tuile d'images.

Voici les étapes générales pour utiliser GeoServer avec une application :

Installer et configurez GeoServer .
Importer les données spatiales dans GeoServer.
Configurer les styles et les règles de rendu pour les couches.
Utiliser les URL de GeoServer pour charger les données spatiales dans votre application OpenLayers.
L'utilisation de GeoServer vous permet de bénéficier de fonctionnalités d'import en tuiles, ce qui améliore considérablement les pérformances.

N'hésitez pas à explorer davantage la documentation de GeoServer pour en savoir plus sur ses fonctionnalités et son utilisation.

# Structure de code 
Le code est structuré comme suit 
```bash
.
clc_pop_evol/
├── gihub/
├── doc/
│   ├── README.MD
├── geodata/
│   ├── artificialisation.gojson
│   ├── population.gojson
├── chart.js
├── index.html
├── main.js
├── style.css
└── execute.php

```
# Conclusion
Ce README fournit un aperçu du code développé pour télécharger des données GeoJSON sur une carte OpenLayers. Il explique également comment utiliser GeoServer pour améliorer les performances et le déploiement de l'application. J'espère que ces informations vous seront utiles dans votre projet. Si vous avez d'autres questions, n'hésitez pas à demander.

# Récupération des données
Dans ce projet, deux jeux de données ont été utilisés : Corine Land Cover (CLC) pour les années 2006, 2012 et 2018, ainsi que les données de population de l'Insee pour les mêmes dates. L'objectif était de comparer les taux d'augmentation de la population et de l'artificialisation sur la même période, afin de déterminer si la population a augmenté quatre fois plus rapidement que l'artificialisation.

# Données CLC et population de l'Insee
Les données CLC fournissent des informations sur l'occupation des sols à l'échelle européenne. Elles permettent de classer les terres en différentes catégories, telles que les zones urbaines, les terres agricoles, les forêts, etc. Ces données sont disponibles pour différentes années, dans ce cas précis pour les années 2006, 2012 et 2018.

Les données de population de l'Insee fournissent des informations sur la population résidente en France. Ces données sont également disponibles pour différentes années, correspondant aux années des données CLC utilisées dans le projet.

# Interpolation spatiale des données CLC
Les données CLC ont été interpolées spatialement en utilisant les régions administratives. Cela signifie que les valeurs d'occupation des sols des cellules CLC ont été agrégées pour chaque région, fournissant ainsi une valeur globale pour chaque catégorie d'occupation des sols dans chaque région. Cela permet de simplifier les données et de les rendre plus facilement comparables avec les données de population par région.

# Jointure des données CLC et de population de l'Insee
Les données CLC et les données de population de l'Insee ont été jointes en utilisant le code Insee, à la fois pour les anciens codes et les nouveaux codes Insee. Cette jointure a permis d'associer les données d'occupation des sols et de population pour chaque région.

# Comparaison des taux d'augmentation
Une fois les données CLC et de population jointes, il a été possible de calculer les taux d'augmentation de la population et de l'artificialisation pour chaque région et chaque année. En comparant ces taux, il était possible de déterminer si la population avait augmenté quatre fois plus rapidement que l'artificialisation.

À la fin du projet, un rapport a été généré pour présenter les résultats de cette comparaison. Le rapport incluait des graphiques et des statistiques mettant en évidence les taux d'augmentation de la population et de l'artificialisation, ainsi que la comparaison entre les deux.