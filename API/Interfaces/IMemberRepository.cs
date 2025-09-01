using System;
using API.Entities;

namespace API.Interfaces;

public interface IMemberRepository
{
    void UpdateMember(Member member);
    void RemoveMember(Member member);
    Task<bool> SaveAllAsync();
    Task<IReadOnlyList<Member>> GetMembersAsync();
    Task<Member?> GetMemberByIdAsync(string id);
    Task<IReadOnlyList<Photo>> GetPhotosByMemberIdAsync(string memberId);
    IEnumerable<Member> GetAllMembers();
}