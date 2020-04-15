module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'admin',
  database: 'magic-pet',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
