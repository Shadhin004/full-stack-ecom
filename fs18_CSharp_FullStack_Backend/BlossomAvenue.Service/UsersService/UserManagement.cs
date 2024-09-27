﻿using AutoMapper;
using BlossomAvenue.Service.Repositories.Users;
using BlossomAvenue.Service.CustomExceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BlossomAvenue.Core.Users;
using Microsoft.Extensions.Configuration;
using BlossomAvenue.Service.Repositories.Cities;
using BlossomAvenue.Service.Cryptography;
using BlossomAvenue.Service.UsersService.Dtos;
using BlossomAvenue.Service.Repositories.Carts;

namespace BlossomAvenue.Service.UsersService
{
    public class UserManagement : IUserManagement
    {
        private readonly IUserRepository _userRepository;
        private readonly IUserRoleRepository _userRoleRepository;
        private readonly ICityRepository _cityRepository;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        private readonly IPasswordHasher _passwordHasher;

        private readonly ICartRepository _cartRepository;

        public UserManagement(
            IUserRepository userRepository,
            IUserRoleRepository userRoleRepository,
            ICityRepository cityRepository,
            IMapper mapper,
            IConfiguration configuration,
            IPasswordHasher passwordHasher,
            ICartRepository cartRepository
            )
        {
            _userRepository = userRepository;
            _userRoleRepository = userRoleRepository;
            _cityRepository = cityRepository;
            _mapper = mapper;
            _configuration = configuration;
            this._passwordHasher = passwordHasher;
            _cartRepository = cartRepository;
        }

        public UserManagement(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public async Task ActiveInactiveUser(Guid userId, bool status)
        {

            var user = await _userRepository.GetUser(userId) ?? throw new RecordNotFoundException(typeof(User).Name);

            user.IsUserActive = status;
            await _userRepository.UpdateUser(user);
        }


        public async Task<UserDto> CreateUser(Dtos.CreateUpdateUserDto user)
        {
            if (await _userRepository.CheckUserExistsByEmail(user.Email!)) throw new RecordAlreadyExistsException(typeof(User).Name);

            var adminUserRole = await GetAdminRole();

            var userEntity = _mapper.Map<User>(user);
            userEntity.UserId = Guid.Empty;
            userEntity.UserRole = adminUserRole;
            userEntity.IsUserActive = true;

            var createdUser = await _userRepository.CreateUser(userEntity);

            //TODO: Send email to user with password

            return _mapper.Map<UserDto>(createdUser);
        }

        public async Task<CreateDetailedUserResponseDto> CreateProfile(CreateDetailedUserDto profile)
        {
            if (await _userRepository.CheckUserExistsByEmail(profile.Email!)) throw new RecordAlreadyExistsException(typeof(User).Name);

            if (!(await _cityRepository.IsCityExists(profile.CityId))) throw new RecordNotFoundException(typeof(City).Name);

            var userRole = await GetUserRole();

            var userEntity = _mapper.Map<User>(profile);

            userEntity.UserRole = userRole;

            userEntity.UserCredential = new UserCredential()
            {
                UserName = profile.UserName,
                Password = _passwordHasher.HashPassword(profile.Password)
            };

            var savedUser = await _userRepository.CreateUser(userEntity);

            var returnProfile = _mapper.Map<CreateDetailedUserResponseDto>(profile);
            returnProfile.UserId = savedUser.UserId;
            returnProfile.Password = String.Empty;

            var createCart = await _cartRepository.CreateCart(savedUser.UserId);

            if (createCart)
            {
                return returnProfile;
            }else
            {
                return returnProfile;
            }
        }

        public void DeleteUser(Guid userId)
        {
            throw new NotImplementedException();
        }

        public async Task<UserDetailedDto> GetUser(Guid userId)
        {
            var user = await _userRepository.GetUser(userId);
            return user is null ? throw new RecordNotFoundException("User") : _mapper.Map<UserDetailedDto>(user);
        }

        public async Task<List<UserDto>> GetUsers(UsersQueryDto query)
        {
            var users = await _userRepository.GetUsers(query);
            return _mapper.Map<List<UserDto>>(users);
        }

        public async Task UpdateUser(Guid userId, CreateUpdateUserDto user)
        {
            var existing = await _userRepository.GetUser(userId) ?? throw new RecordNotFoundException(typeof(User).Name);

            if (await _userRepository.CheckEmailExistsWithOtherUsers(userId, user.Email!)) throw new RecordAlreadyExistsException("Email");

            existing.FirstName = user.FirstName;
            existing.LastName = user.LastName;
            existing.Email = user.Email;

            await _userRepository.UpdateUser(existing);
        }

        private async Task<UserRole> GetAdminRole()
        {
            var adminRoleName = _configuration.GetSection("UserRoles").GetSection("Admin").Value;

            if (string.IsNullOrEmpty(adminRoleName))
            {
                throw new RecordNotFoundException("Admin Role in config");
            }

            return await GetRole(adminRoleName);
        }

        private async Task<UserRole> GetUserRole()
        {
            var adminRoleName = _configuration.GetSection("UserRoles").GetSection("User").Value;
            if (string.IsNullOrEmpty(adminRoleName))
            {
                throw new RecordNotFoundException("User Role in config");
            }

            return await GetRole(adminRoleName);
        }

        private async Task<UserRole> GetRole(string roleName)
        {
            var userRole = await _userRoleRepository.GetUserRoleByName(roleName);
            return userRole is null ? throw new RecordNotFoundException("User Role") : userRole;
        }


    }
}

