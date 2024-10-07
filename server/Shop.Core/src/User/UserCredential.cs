using System;
using System.Collections.Generic;

namespace Shop.Core.User;

public partial class UserCredential
{
    public int UserId { get; set; }

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public DateTime? CreatedAt { get; set; }

    public string? UserRole { get; set; }

    public virtual ICollection<UserInformation> UserInformations { get; set; } = new List<UserInformation>();
}
