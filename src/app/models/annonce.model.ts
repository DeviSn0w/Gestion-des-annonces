// Define an interface for representing Annonce (Advertisement) data
export interface Annonce {
  title: any;               // The title of the announcement (may be of any type)
  category: any;            // The category of the announcement (may be of any type)
  id: number;               // Unique identifier for the announcement
  titre: string;            // Title of the announcement (string type)
  description: string;      // Description of the announcement (string type)
  categorie: string;        // Category of the announcement (string type)
  utilisateurId: number;    // User ID associated with the announcement
}
