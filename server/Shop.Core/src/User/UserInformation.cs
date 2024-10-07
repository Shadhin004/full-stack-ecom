using System;
using System.Collections.Generic;
using Shop.Core.AddressEntities;

namespace Shop.Core.User;

public partial class UserInformation
{
    public int UserInfoId { get; set; }

    public int UserId { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string? ProfilePhotoLink { get; set; }

    public int? DefaultAddressId { get; set; }

    public string? Phone { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual Address? DefaultAddress { get; set; }

    public virtual UserCredential User { get; set; } = null!;
}
