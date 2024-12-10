import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'menu',
      separator: false,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/client.svg',
          label: 'Vente',
          route: '/Vente',
          children: [
            { label: 'Nouveau Client', route: '/Vente/addClient' },
            { label: 'Clients', route: '/Vente/listClient' },
            { label: 'Nouveau Devi', route: '/Vente/adddevis' },
            { label: 'Devis', route: '/Vente/listdevis' },
            { label: 'Nouveau Livraison', route: '/Vente/livraison' },
            { label: 'Livraisons', route: '/Vente/listlivraison' },
            { label: 'Nouveau Reception', route: '/Vente/reception' },
            { label: 'Receptions', route: '/Vente/listreception' },

            { label: 'Facture', route: '/Vente/factur' },
            { label: 'Facture livraison', route: '/Vente/listfactur' },

            // { label: 'Podcast', route: '/dashboard/podcast' reception},
          ],
        },
        {
          icon: 'assets/icons/heroicons/outline/stock.svg',
          label: 'stock',
          route: '/stock',
          children: [
            { label: 'Nouveau Produit', route: '/stock/product' },
            { label: 'Produits', route: '/stock/listproduct' },
            
          ],
        },
        {
          icon: 'assets/icons/heroicons/outline/achat.svg',
          label: 'Achat',
          route: '/Achat',
          children: [

            { label: 'Nouveau Fournisseur', route: '/Achat/fournisseur' },
            { label: 'Fournisseurs', route: '/listFournisseur' },

            { label: 'demande prix', route: '/demandeprix' },
            { label: 'list demande', route: '/listdemande' },
            { label: 'Nouveau commmande', route: '/commmande' },
            { label: 'Commmandes', route: '/listcommmande' },
          ],
        },
        {
          icon: 'assets/icons/heroicons/outline/setting.svg',
          label: 'setting',
          route: '/setting',
          children: [
            { label: 'TVA', route: '/setting/TVA' },
            { label: 'Unity', route: '/setting/Unity' },
            { label: 'Color', route: '/setting/Color' },
            { label: 'Modes_paiment', route: '/setting/Modes_paiment' },
            { label: 'Depot', route: '/setting/Depot' },
            { label: 'User', route: '/setting/user' },

          ],
        },
      ],
    },
    
    
  ];
}
