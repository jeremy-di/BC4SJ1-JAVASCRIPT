USE library;
CREATE TABLE emprunt (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_livre INT NOT NULL,
    id_utilisateur INT NOT NULL,
    date_emprunt DATE NOT NULL,
    date_retour_prevue DATE,
    date_retour_effectif DATE,
    FOREIGN KEY (id_livre) REFERENCES livres(id),
    FOREIGN KEY (id_utilisateur) REFERENCES utilisateurs(id)
);  
INSERT INTO emprunt (id_livre, id_utilisateur, date_emprunt) VALUES (1, 2, '2024-02-02');