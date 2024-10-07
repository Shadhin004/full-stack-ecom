using System;
using System.Collections.Generic;
using Shop.Core.User;

namespace Shop.Core.AddressEntities;

public partial class Address
{
    public int AddressId { get; set; }

    public string Address1 { get; set; } = null!;

    public string? Address2 { get; set; }

    public string PostalCode { get; set; } = null!;

    public string State { get; set; } = null!;

    public int CityId { get; set; }

    public int CountryId { get; set; }

    public virtual City City { get; set; } = null!;

    public virtual Country Country { get; set; } = null!;

    public virtual ICollection<UserInformation> UserInformations { get; set; } = new List<UserInformation>();
}
