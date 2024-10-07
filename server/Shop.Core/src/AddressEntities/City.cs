using System;
using System.Collections.Generic;

namespace Shop.Core.AddressEntities;

public partial class City
{
    public int CityId { get; set; }

    public int CountryId { get; set; }

    public string CityName { get; set; } = null!;

    public virtual ICollection<Address> Addresses { get; set; } = new List<Address>();

    public virtual Country Country { get; set; } = null!;
}
