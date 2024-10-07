using Microsoft.EntityFrameworkCore;
using Shop.Core.AddressEntities;
using Shop.Core.User;

namespace Shop.Infrastrcture.Database;
public partial class ShopDbContext : DbContext
{
    // public partial class FullstackEcomContext : DbContext
    // {
        public ShopDbContext()
        {
        }

        public ShopDbContext(DbContextOptions<ShopDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Address> Addresses { get; set; }

        public virtual DbSet<City> Cities { get; set; }

        public virtual DbSet<Country> Countries { get; set; }

        public virtual DbSet<UserCredential> UserCredentials { get; set; }

        public virtual DbSet<UserInformation> UserInformations { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
            => optionsBuilder.UseNpgsql("Host=localhost;Database=fullstack_ecom;Username=app_user;Password=11223344");

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Address>(entity =>
            {
                entity.HasKey(e => e.AddressId).HasName("address_pkey");

                entity.ToTable("address");

                entity.Property(e => e.AddressId).HasColumnName("address_id");
                entity.Property(e => e.Address1)
                    .HasMaxLength(255)
                    .HasColumnName("address_1");
                entity.Property(e => e.Address2)
                    .HasMaxLength(255)
                    .HasColumnName("address_2");
                entity.Property(e => e.CityId).HasColumnName("city_id");
                entity.Property(e => e.CountryId).HasColumnName("country_id");
                entity.Property(e => e.PostalCode)
                    .HasMaxLength(20)
                    .HasColumnName("postal_code");
                entity.Property(e => e.State)
                    .HasMaxLength(100)
                    .HasColumnName("state");

                entity.HasOne(d => d.City).WithMany(p => p.Addresses)
                    .HasForeignKey(d => d.CityId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("address_city_id_fkey");

                entity.HasOne(d => d.Country).WithMany(p => p.Addresses)
                    .HasForeignKey(d => d.CountryId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("address_country_id_fkey");
            });

            modelBuilder.Entity<City>(entity =>
            {
                entity.HasKey(e => e.CityId).HasName("city_pkey");

                entity.ToTable("city");

                entity.Property(e => e.CityId).HasColumnName("city_id");
                entity.Property(e => e.CityName)
                    .HasMaxLength(100)
                    .HasColumnName("city_name");
                entity.Property(e => e.CountryId).HasColumnName("country_id");

                entity.HasOne(d => d.Country).WithMany(p => p.Cities)
                    .HasForeignKey(d => d.CountryId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_country");
            });

            modelBuilder.Entity<Country>(entity =>
            {
                entity.HasKey(e => e.CountryId).HasName("country_pkey");

                entity.ToTable("country");

                entity.Property(e => e.CountryId).HasColumnName("country_id");
                entity.Property(e => e.CountryName)
                    .HasMaxLength(100)
                    .HasColumnName("country_name");
            });

            modelBuilder.Entity<UserCredential>(entity =>
            {
                entity.HasKey(e => e.UserId).HasName("user_credentials_pkey");

                entity.ToTable("user_credentials");

                entity.HasIndex(e => e.Email, "user_credentials_email_key").IsUnique();

                entity.Property(e => e.UserId).HasColumnName("user_id");
                entity.Property(e => e.CreatedAt)
                    .HasDefaultValueSql("CURRENT_TIMESTAMP")
                    .HasColumnType("timestamp without time zone")
                    .HasColumnName("created_at");
                entity.Property(e => e.Email)
                    .HasMaxLength(255)
                    .HasColumnName("email");
                entity.Property(e => e.Password)
                    .HasMaxLength(255)
                    .HasColumnName("password");
                entity.Property(e => e.UserRole)
                    .HasMaxLength(50)
                    .HasDefaultValueSql("'customer'::character varying")
                    .HasColumnName("user_role");
            });

            modelBuilder.Entity<UserInformation>(entity =>
            {
                entity.HasKey(e => e.UserInfoId).HasName("user_informations_pkey");

                entity.ToTable("user_informations");

                entity.HasIndex(e => e.Phone, "user_informations_phone_key").IsUnique();

                entity.Property(e => e.UserInfoId).HasColumnName("user_info_id");
                entity.Property(e => e.CreatedAt)
                    .HasDefaultValueSql("CURRENT_TIMESTAMP")
                    .HasColumnType("timestamp without time zone")
                    .HasColumnName("created_at");
                entity.Property(e => e.DefaultAddressId).HasColumnName("default_address_id");
                entity.Property(e => e.FirstName)
                    .HasMaxLength(100)
                    .HasColumnName("first_name");
                entity.Property(e => e.LastName)
                    .HasMaxLength(100)
                    .HasColumnName("last_name");
                entity.Property(e => e.Phone)
                    .HasMaxLength(20)
                    .HasColumnName("phone");
                entity.Property(e => e.ProfilePhotoLink)
                    .HasMaxLength(255)
                    .HasColumnName("profile_photo_link");
                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.DefaultAddress).WithMany(p => p.UserInformations)
                    .HasForeignKey(d => d.DefaultAddressId)
                    .HasConstraintName("fk_default_address");

                entity.HasOne(d => d.User).WithMany(p => p.UserInformations)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_user");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    // }

}
