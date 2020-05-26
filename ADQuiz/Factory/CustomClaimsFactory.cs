using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ADQuiz
{
    public class CustomClaimsFactory : UserClaimsPrincipalFactory<User, IdentityRole>
    {
        public CustomClaimsFactory(UserManager<User> userManager, RoleManager<IdentityRole> roleManager, IOptions<IdentityOptions> optionsAccessor) : base(userManager, roleManager, optionsAccessor)
        {

        }
        protected override async Task<ClaimsIdentity> GenerateClaimsAsync(User user)
        {
            var identity = await base.GenerateClaimsAsync(user);
          // identity.AddClaim(new Claim("firstname", user.FirstName));
          // identity.AddClaim(new Claim("lastname", user.LastName));
          // identity.AddClaim(new Claim("id", user.Id));
            return identity;
        }
    }
}
