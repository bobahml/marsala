using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace WebApplication1.Auth
{
    public class TempRoleStore : IRoleStore<ApplicationRole>
    {
        private readonly List<ApplicationRole> _roles;

        public TempRoleStore()
        {
            _roles = new List<ApplicationRole>()
            {
                new ApplicationRole {RoleId = "8C710F38-58F0-4D20-8AAA-8C0FC243B5AF", RoleName= "User" },
                new ApplicationRole {RoleId = "7442F542-FBE1-4ACB-A1DB-91B75A4A079D", RoleName= "Admin" }
            };
        }

        public Task<IdentityResult> CreateAsync(ApplicationRole role, CancellationToken cancellationToken)
        {
            _roles.Add(role);

            return Task.FromResult(IdentityResult.Success);
        }

        public Task<IdentityResult> UpdateAsync(ApplicationRole role, CancellationToken cancellationToken)
        {
            var match = _roles.FirstOrDefault(r => r.RoleId == role.RoleId);
            if (match != null)
            {
                match.RoleName = role.RoleName;

                return Task.FromResult(IdentityResult.Success);
            }
            else
            {
                return Task.FromResult(IdentityResult.Failed());
            }
        }

        public Task<IdentityResult> DeleteAsync(ApplicationRole role, CancellationToken cancellationToken)
        {
            var match = _roles.FirstOrDefault(r => r.RoleId == role.RoleId);
            if (match != null)
            {
                _roles.Remove(match);

                return Task.FromResult(IdentityResult.Success);
            }
            else
            {
                return Task.FromResult(IdentityResult.Failed());
            }
        }

        public Task<ApplicationRole> FindByIdAsync(string roleId, CancellationToken cancellationToken)
        {
            var role = _roles.FirstOrDefault(r => r.RoleId == roleId);

            return Task.FromResult(role);
        }

        public Task<ApplicationRole> FindByNameAsync(string normalizedRoleName, CancellationToken cancellationToken)
        {
            var role = _roles.FirstOrDefault(r => r.RoleName == normalizedRoleName);

            return Task.FromResult(role);
        }

        public Task<string> GetRoleIdAsync(ApplicationRole role, CancellationToken cancellationToken)
        {
            return Task.FromResult(role.RoleId);
        }

        public Task<string> GetRoleNameAsync(ApplicationRole role, CancellationToken cancellationToken)
        {
            return Task.FromResult(role.RoleName);
        }

        public Task<string> GetNormalizedRoleNameAsync(ApplicationRole role, CancellationToken cancellationToken)
        {
            return Task.FromResult(role.RoleName);
        }

        public Task SetRoleNameAsync(ApplicationRole role, string roleName, CancellationToken cancellationToken)
        {
            role.RoleName = roleName;

            return Task.FromResult(true);
        }

        public Task SetNormalizedRoleNameAsync(ApplicationRole role, string normalizedName, CancellationToken cancellationToken)
        {
            role.RoleName = normalizedName;

            return Task.FromResult(true);
        }

        public void Dispose() { }
    }
}